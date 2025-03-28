const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');
require('dotenv').config();

// Sleep function for rate limiting
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * DocSlurper - A class for finding documentation for packages
 * using web search and package registry APIs
 */
class DocSlurper {
  /**
   * Create a new DocSlurper
   * @param {Object} options - Configuration options 
   * @param {string} options.registryPath - Path to the registry JSON file
   * @param {string} options.apiKey - Brave Search API key (or from env var)
   * @param {boolean} options.verbose - Enable verbose logging
   */
  constructor(options = {}) {
    this.registryPath = options.registryPath || path.join(__dirname, '../data/registry.json');
    this.fallbackRegistryPath = options.fallbackRegistryPath || path.join(__dirname, '../data/doc_sites.json');
    this.apiKey = options.apiKey || process.env.BRAVE_API_KEY;
    this.verbose = options.verbose || false;
    this.registry = null;
    this.fallbackRegistry = null;
    this.rateLimitDelay = options.rateLimitDelay || parseInt(process.env.BRAVE_RATE_LIMIT_DELAY || '1000', 10);
  }

  /**
   * Load or initialize the registry
   * @returns {Promise<Object>} The loaded registry
   */
  async loadRegistry() {
    if (this.registry) return this.registry;
    
    try {
      // Check if registry file exists
      if (await fs.pathExists(this.registryPath)) {
        this.registry = await fs.readJson(this.registryPath);
      } else {
        // Create empty registry
        this.registry = { packages: {} };
        await this.saveRegistry();
      }
      return this.registry;
    } catch (error) {
      console.error('Error loading registry:', error);
      throw error;
    }
  }
  
  /**
   * Load the fallback registry from doc_sites.json
   * @returns {Promise<Array>} The loaded registry
   */
  async loadFallbackRegistry() {
    if (this.fallbackRegistry) return this.fallbackRegistry;
    
    try {
      if (await fs.pathExists(this.fallbackRegistryPath)) {
        const data = await fs.readJson(this.fallbackRegistryPath);
        this.fallbackRegistry = data.docSites;
        return this.fallbackRegistry;
      }
      return [];
    } catch (error) {
      console.warn('Warning: Could not load fallback registry:', error.message);
      return [];
    }
  }

  /**
   * Save the registry to disk
   * @returns {Promise<void>}
   */
  async saveRegistry() {
    try {
      await fs.ensureDir(path.dirname(this.registryPath));
      await fs.writeJson(this.registryPath, this.registry, { spaces: 2 });
    } catch (error) {
      console.error('Error saving registry:', error);
      throw error;
    }
  }

  /**
   * Find documentation for a package via web search
   * @param {string} packageName - Name of the package
   * @param {string} version - Optional version to find
   * @returns {Promise<Object>} Search results with confidence levels
   */
  async findDocs(packageName, version) {
    // First check if we already have it in the registry
    const registry = await this.loadRegistry();
    const packageEntry = registry.packages[packageName];

    if (packageEntry && (!version || (version && packageEntry.versions[version]))) {
      const versionEntry = version ? packageEntry.versions[version] : 
        Object.values(packageEntry.versions)[0]; // Get the first version if not specified
      
      return {
        found: true,
        source: 'registry',
        package: packageName,
        version: version || Object.keys(packageEntry.versions)[0],
        urls: versionEntry.documentationUrls,
        registryUrl: packageEntry.registryUrl,
        repositoryUrl: packageEntry.repositoryUrl
      };
    }

    // Check fallback registry for static entries
    try {
      const fallbackRegistry = await this.loadFallbackRegistry();
      const fallbackEntry = fallbackRegistry.find(
        entry => entry.name.toLowerCase() === packageName.toLowerCase()
      );
      
      if (fallbackEntry) {
        console.log(`Found ${packageName} in fallback registry`);
        
        // Add to main registry
        await this.updateRegistryFromFallback(packageName, version, fallbackEntry);
        
        return {
          found: true,
          source: 'fallback_registry',
          package: packageName,
          version: version || fallbackEntry.latestVersion,
          urls: [{
            url: fallbackEntry.documentationUrl,
            type: 'official',
            confidence: version === fallbackEntry.latestVersion ? 'EXACT' : 'UNKNOWN'
          }],
          registryUrl: fallbackEntry.registryUrl,
          message: `Found in static registry`
        };
      }
    } catch (error) {
      console.warn('Error checking fallback registry:', error.message);
    }

    // Not in registry, search via web
    try {
      return await this.searchDocs(packageName, version);
    } catch (error) {
      console.error(`Error searching docs for ${packageName}:`, error.message);
      
      // Return not found result
      return {
        found: false,
        source: 'search',
        package: packageName,
        version: version,
        message: `Error searching for documentation: ${error.message}`
      };
    }
  }

  /**
   * Update registry with an entry from fallback registry
   * @param {string} packageName - Package name
   * @param {string} version - Package version (optional)
   * @param {Object} fallbackEntry - Entry from fallback registry
   */
  async updateRegistryFromFallback(packageName, version, fallbackEntry) {
    const registry = await this.loadRegistry();
    
    // Initialize package entry if it doesn't exist
    if (!registry.packages[packageName]) {
      registry.packages[packageName] = {
        versions: {},
        registryUrl: fallbackEntry.registryUrl || null,
        repositoryUrl: null
      };
    }
    
    // Use provided version or latestVersion from fallback
    const versionToUse = version || fallbackEntry.latestVersion;
    
    if (versionToUse) {
      registry.packages[packageName].versions[versionToUse] = {
        documentationUrls: [{
          url: fallbackEntry.documentationUrl,
          type: 'official',
          confidence: version === fallbackEntry.latestVersion ? 'EXACT' : 'UNKNOWN'
        }],
        lastUpdated: new Date().toISOString()
      };
    }
    
    // Save registry
    await this.saveRegistry();
  }

  /**
   * Search for documentation using Brave Search API
   * @param {string} packageName - Name of the package
   * @param {string} version - Optional version to find
   * @returns {Promise<Object>} Search results with confidence levels
   */
  async searchDocs(packageName, version) {
    if (!this.apiKey) {
      throw new Error('Brave Search API key is required. Set BRAVE_API_KEY environment variable or pass in options.');
    }

    // Validate API key format (basic check)
    if (!/^[A-Za-z0-9_-]+$/.test(this.apiKey)) {
      throw new Error('Invalid API key format. Please check your Brave Search API key.');
    }

    // Construct search queries
    const queries = [
      `${packageName} documentation`,
      version ? `${packageName} ${version} documentation` : null,
      `${packageName} API reference`,
      `${packageName} developer guide`
    ].filter(Boolean);

    const results = [];

    for (const query of queries) {
      if (this.verbose) console.log(`Searching: ${query}`);
      
      try {
        // Respect rate limiting
        await sleep(this.rateLimitDelay);
        
        const response = await axios.get('https://api.search.brave.com/res/v1/web/search', {
          headers: { 
            'X-Subscription-Token': this.apiKey,
            'Accept': 'application/json'
          },
          params: {
            q: query,
            count: 10
          }
        });
        
        if (response.data && response.data.web && response.data.web.results) {
          results.push(...response.data.web.results);
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const statusCode = error.response.status;
          const errorData = error.response.data;
          
          if (statusCode === 422) {
            throw new Error('API Error 422: Unprocessable Entity. This may indicate an invalid API key or malformed request.');
          } else if (statusCode === 429) {
            console.warn(`Rate limit exceeded for "${query}". Waiting longer before next request.`);
            await sleep(this.rateLimitDelay * 2); // Wait twice as long next time
          } else {
            console.error(`Error searching for "${query}": Status ${statusCode}`, 
                          errorData ? JSON.stringify(errorData) : '');
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error(`Error searching for "${query}": No response received`);
        } else {
          // Something happened in setting up the request
          console.error(`Error searching for "${query}":`, error.message);
        }
        
        // Rethrow 422 error since it likely indicates a configuration issue
        if (error.response && error.response.status === 422) {
          throw error;
        }
      }
    }

    // Score and filter results to find documentation sites
    const scoredResults = this.scoreDocumentationSites(results, packageName, version);
    
    // No results
    if (scoredResults.length === 0) {
      return {
        found: false,
        source: 'search',
        package: packageName,
        version: version,
        message: 'No documentation found'
      };
    }

    // Take top results
    const topResults = scoredResults.slice(0, 3);
    
    // Validate URLs
    const validatedResults = await this.validateDocUrls(topResults, packageName, version);
    
    // Update registry with results
    await this.updateRegistry(packageName, version, validatedResults);
    
    return {
      found: true,
      source: 'search',
      package: packageName,
      version: version,
      urls: validatedResults.map(r => ({
        url: r.url,
        type: r.type,
        confidence: r.confidence
      })),
      message: `Found ${validatedResults.length} documentation sources`
    };
  }

  /**
   * Score search results to find documentation sites
   * @param {Array} results - Search results from Brave
   * @param {string} packageName - Name of the package
   * @param {string} version - Optional version to find
   * @returns {Array} Scored and sorted results
   */
  scoreDocumentationSites(results, packageName, version) {
    const packageNameLower = packageName.toLowerCase();
    const scoredResults = [];
    
    // Remove duplicates
    const uniqueResults = [];
    const urls = new Set();
    
    for (const result of results) {
      if (!urls.has(result.url)) {
        urls.add(result.url);
        uniqueResults.push(result);
      }
    }
    
    for (const result of uniqueResults) {
      let score = 0;
      const url = result.url;
      const title = result.title.toLowerCase();
      const description = result.description.toLowerCase();
      
      // URL Pattern Matching (highest confidence)
      if (url.includes('/docs/') || url.includes('/documentation/') || 
          url.includes('/guide/') || url.includes('/api/')) {
        score += 30;
      }
      
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('docs.') || 
          urlObj.hostname.includes('readthedocs.io') || 
          urlObj.hostname.endsWith('.dev/docs')) {
        score += 25;
      }
      
      if (urlObj.hostname.startsWith(packageNameLower + '.') || 
          urlObj.hostname === packageNameLower + '.org' || 
          urlObj.hostname === packageNameLower + '.com' || 
          urlObj.hostname === packageNameLower + '.dev') {
        score += 50; // Very strong signal if package name is the domain
      }
      
      // Title/Description Analysis
      if (title.includes('documentation') || 
          title.includes('api reference') || 
          title.includes('developer guide') || 
          title.includes('docs')) {
        score += 20;
      }
      
      if (description.includes('official docs') || 
          description.includes('reference manual') || 
          description.includes('api documentation')) {
        score += 15;
      }
      
      // Check if package name is in title/description
      if (title.includes(packageNameLower)) {
        score += 25;
      }
      
      if (description.includes(packageNameLower)) {
        score += 15;
      }
      
      // Version matching if applicable
      if (version && (title.includes(version) || description.includes(version))) {
        score += 40; // Strong signal if version is mentioned
      }
      
      // Known Documentation Platforms
      if (url.includes('github.io') || 
          url.includes('readthedocs.io') || 
          url.includes('rtfd.io') || 
          url.includes('github.com') && url.includes('/wiki/')) {
        score += 20;
      }
      
      // Add result with score
      scoredResults.push({
        url,
        title: result.title,
        description: result.description,
        score
      });
    }
    
    // Sort by score (highest first)
    return scoredResults.sort((a, b) => b.score - a.score);
  }

  /**
   * Validate documentation URLs and check version information
   * @param {Array} results - Scored search results
   * @param {string} packageName - Name of the package
   * @param {string} version - Optional version to find
   * @returns {Promise<Array>} Validated results with confidence levels
   */
  async validateDocUrls(results, packageName, version) {
    const validatedResults = [];
    
    for (const result of results) {
      try {
        // Make a test request
        const response = await axios.get(result.url, {
          timeout: 5000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        const html = response.data;
        
        // Determine confidence level for version match
        let confidence = 'UNKNOWN';
        let type = 'unknown';
        
        // Check URL for version information
        if (version) {
          if (result.url.includes(`/${version}/`)) {
            confidence = 'EXACT';
          } else if (version.includes('.') && 
                    result.url.includes(`/${version.split('.')[0]}.${version.split('.')[1]}/`)) {
            confidence = 'CLOSE';
          } else if (html.includes(version)) {
            confidence = 'EXACT';
          }
        }
        
        // Determine document type
        if (result.url.includes('github.com')) {
          type = 'repository';
        } else if (result.url.includes('npmjs.com') || 
                 result.url.includes('pypi.org') || 
                 result.url.includes('rubygems.org')) {
          type = 'registry';
        } else {
          type = 'official';
        }
        
        validatedResults.push({
          url: result.url,
          title: result.title,
          description: result.description,
          score: result.score,
          confidence,
          type
        });
      } catch (error) {
        console.warn(`Failed to validate URL ${result.url}:`, error.message);
        // Skip invalid URLs
      }
    }
    
    return validatedResults;
  }

  /**
   * Update registry with search results
   * @param {string} packageName - Name of the package
   * @param {string} version - Optional version
   * @param {Array} results - Validated search results
   * @returns {Promise<void>}
   */
  async updateRegistry(packageName, version, results) {
    if (results.length === 0) return;
    
    const registry = await this.loadRegistry();
    
    // Initialize package entry if it doesn't exist
    if (!registry.packages[packageName]) {
      registry.packages[packageName] = {
        versions: {},
        registryUrl: null,
        repositoryUrl: null
      };
    }
    
    // Find registry and repository URLs
    const registryResult = results.find(r => r.type === 'registry');
    const repoResult = results.find(r => r.type === 'repository');
    
    if (registryResult) {
      registry.packages[packageName].registryUrl = registryResult.url;
    }
    
    if (repoResult) {
      registry.packages[packageName].repositoryUrl = repoResult.url;
    }
    
    // Add version if specified
    if (version) {
      registry.packages[packageName].versions[version] = {
        documentationUrls: results.map(r => ({
          url: r.url,
          type: r.type,
          confidence: r.confidence
        })),
        lastUpdated: new Date().toISOString()
      };
    } else {
      // If no version specified, use "latest"
      registry.packages[packageName].versions.latest = {
        documentationUrls: results.map(r => ({
          url: r.url,
          type: r.type,
          confidence: r.confidence
        })),
        lastUpdated: new Date().toISOString()
      };
    }
    
    // Save registry
    await this.saveRegistry();
  }

  /**
   * Check if a package exists in the registry
   * @param {string} packageName - Name of the package
   * @param {string} version - Optional version
   * @returns {Promise<boolean>} True if package+version exists
   */
  async hasPackage(packageName, version) {
    const registry = await this.loadRegistry();
    
    if (!registry.packages[packageName]) {
      return false;
    }
    
    if (version) {
      return !!registry.packages[packageName].versions[version];
    }
    
    return Object.keys(registry.packages[packageName].versions).length > 0;
  }

  /**
   * List all packages in the registry
   * @returns {Promise<Array>} List of packages with versions
   */
  async listPackages() {
    const registry = await this.loadRegistry();
    const result = [];
    
    for (const [packageName, packageInfo] of Object.entries(registry.packages)) {
      result.push({
        name: packageName,
        versions: Object.keys(packageInfo.versions),
        registryUrl: packageInfo.registryUrl,
        repositoryUrl: packageInfo.repositoryUrl
      });
    }
    
    return result;
  }

  /**
   * Remove a package from the registry
   * @param {string} packageName - Name of the package
   * @param {string} version - Optional version (if not specified, all versions)
   * @returns {Promise<boolean>} True if package was removed
   */
  async removePackage(packageName, version) {
    const registry = await this.loadRegistry();
    
    if (!registry.packages[packageName]) {
      return false;
    }
    
    if (version) {
      // Remove specific version
      if (registry.packages[packageName].versions[version]) {
        delete registry.packages[packageName].versions[version];
        
        // Remove package if no versions left
        if (Object.keys(registry.packages[packageName].versions).length === 0) {
          delete registry.packages[packageName];
        }
        
        await this.saveRegistry();
        return true;
      }
      return false;
    } else {
      // Remove entire package
      delete registry.packages[packageName];
      await this.saveRegistry();
      return true;
    }
  }
}

module.exports = DocSlurper;
