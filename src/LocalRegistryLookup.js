const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');

/**
 * LocalRegistryLookup - A class for finding documentation for packages
 * based on their name and version using a local registry
 */
class LocalRegistryLookup {
  /**
   * Create a new DocFinder
   * @param {Object} options - Configuration options 
   * @param {string} options.registryPath - Path to the documentation registry JSON file
   */
  constructor(options = {}) {
    this.registryPath = options.registryPath || path.join(__dirname, '../data/doc_sites.json');
    this.registry = null;
  }

  /**
   * Load the documentation registry
   * @returns {Promise<Array>} The loaded registry
   */
  async loadRegistry() {
    if (this.registry) return this.registry;
    
    try {
      // Check if registry file exists
      if (await fs.pathExists(this.registryPath)) {
        const data = await fs.readJson(this.registryPath);
        this.registry = data.docSites;
      } else {
        // Create default registry if file doesn't exist
        console.log('Registry file not found. Creating a new one.');
        
        // Ensure directory exists
        await fs.ensureDir(path.dirname(this.registryPath));
        
        // Create default registry structure
        const defaultRegistry = {
          docSites: []
        };
        
        // Save default registry
        await fs.writeJson(this.registryPath, defaultRegistry, { spaces: 2 });
        
        this.registry = defaultRegistry.docSites;
      }
      
      return this.registry;
    } catch (error) {
      console.error('Error loading doc site registry:', error);
      // Return empty registry instead of throwing
      this.registry = [];
      return this.registry;
    }
  }

  /**
   * Find documentation for a specific package
   * @param {string} packageName - Name of the package
   * @returns {Promise<Object|null>} Package info or null if not found
   */
  async findPackageDoc(packageName) {
    const registry = await this.loadRegistry();
    
    // Case-insensitive search
    const packageNameLower = packageName.toLowerCase();
    
    // Try exact match first
    let match = registry.find(
      doc => doc.name.toLowerCase() === packageNameLower
    );
    
    // If no exact match, try partial match
    if (!match) {
      match = registry.find(
        doc => doc.name.toLowerCase().includes(packageNameLower) || 
               packageNameLower.includes(doc.name.toLowerCase())
      );
    }
    
    return match || null;
  }

  /**
   * Find the documentation URL for a specific version of a package
   * @param {string} packageName - Name of the package
   * @param {string} version - Version of the package
   * @returns {Promise<Object>} Result object with url and exactMatch flag
   */
  async findVersionDocUrl(packageName, version) {
    const packageInfo = await this.findPackageDoc(packageName);
    
    if (!packageInfo) {
      return {
        found: false,
        message: `No documentation found for ${packageName}`,
        url: null,
        exactMatch: false
      };
    }
    
    // Default response with the main documentation URL
    const result = {
      found: true,
      message: `Found documentation for ${packageName}`,
      url: packageInfo.documentationUrl,
      exactMatch: false,
      packageInfo
    };
    
    try {
      // Try to determine if there's version-specific documentation
      if (version) {
        const versionMatch = await this.checkVersionDocumentation(packageInfo, version);
        
        if (versionMatch.url) {
          result.url = versionMatch.url;
          result.exactMatch = versionMatch.exactMatch;
          result.message = versionMatch.exactMatch ? 
            `Found exact version match for ${packageName}@${version}` :
            `Found closest version match for ${packageName}@${version}`;
        } else {
          result.message = `Found documentation for ${packageName}, but no specific version for ${version}`;
        }
      }
      
      return result;
    } catch (error) {
      console.error(`Error finding version documentation for ${packageName}@${version}:`, error);
      return result; // Return the default URL as fallback
    }
  }

  /**
   * Check if version-specific documentation exists
   * @param {Object} packageInfo - Package information from registry
   * @param {string} version - Version to look for
   * @returns {Promise<Object>} Result with URL and exactMatch flag
   */
  async checkVersionDocumentation(packageInfo, version) {
    const result = {
      url: null,
      exactMatch: false
    };
    
    // Handle different documentation patterns based on ecosystem or site
    try {
      // Simplified implementation for demonstration - in a real implementation,
      // we would have specific handlers for different documentation sites
      
      const docUrl = packageInfo.documentationUrl;
      
      // Common pattern: version in URL path
      // Examples: flask.palletsprojects.com/en/2.0.x/, docs.djangoproject.com/en/5.0/
      if (docUrl.includes('/en/')) {
        const baseUrlParts = docUrl.split('/en/');
        const newUrl = `${baseUrlParts[0]}/en/${version}/`;
        
        // Check if this version URL exists (simplistic check)
        try {
          await axios.head(newUrl);
          result.url = newUrl;
          result.exactMatch = true;
        } catch (error) {
          // If exact version doesn't exist, try major.minor
          const majorMinor = version.split('.').slice(0, 2).join('.');
          const majorMinorUrl = `${baseUrlParts[0]}/en/${majorMinor}/`;
          
          try {
            await axios.head(majorMinorUrl);
            result.url = majorMinorUrl;
            result.exactMatch = false;
          } catch {
            // Fallback to the main URL
            result.url = docUrl;
            result.exactMatch = false;
          }
        }
      } else {
        // For now, just return the main documentation URL
        result.url = docUrl;
      }
      
      return result;
    } catch (error) {
      console.error(`Error checking version documentation:`, error);
      return result; // Return empty result as fallback
    }
  }

  /**
   * Save the registry to disk
   * @returns {Promise<void>}
   */
  async saveRegistry() {
    try {
      await fs.writeJson(this.registryPath, { docSites: this.registry }, { spaces: 2 });
    } catch (error) {
      console.error('Error saving registry:', error);
    }
  }

  /**
   * Add or update a package in the registry
   * @param {Object} packageInfo - Package information
   * @returns {Promise<Object>} Updated package entry
   */
  async addOrUpdatePackage(packageInfo) {
    await this.loadRegistry();
    
    // Find existing package or create new one
    let existingIndex = this.registry.findIndex(
      p => p.name.toLowerCase() === packageInfo.name.toLowerCase()
    );
    
    if (existingIndex >= 0) {
      // Update existing package
      this.registry[existingIndex] = {
        ...this.registry[existingIndex],
        ...packageInfo,
        // Preserve creation timestamp if it exists
        addedAt: this.registry[existingIndex].addedAt || new Date().toISOString(),
        // Update modified timestamp
        updatedAt: new Date().toISOString()
      };
    } else {
      // Add new package
      this.registry.push({
        ...packageInfo,
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    await this.saveRegistry();
    return existingIndex >= 0 ? this.registry[existingIndex] : this.registry[this.registry.length - 1];
  }
  
  /**
   * Add a URL-based documentation entry to the registry
   * @param {string} url - Documentation URL
   * @param {string} packageName - Package name (optional)
   * @param {string} version - Version (optional)
   * @returns {Promise<Object>} Updated registry entry
   */
  async addUrlToRegistry(url, packageName, version) {
    // Extract package name and version from URL if not provided
    const name = packageName || this.extractPackageNameFromUrl(url) || 
                 `doc-${new URL(url).hostname.replace(/\./g, '-')}`;
    
    return this.addOrUpdatePackage({
      name,
      documentationUrl: url,
      source: 'manual',
      latestVersion: version || this.extractVersionFromUrl(url)
    });
  }

  /**
   * Extract package name from URL
   * @param {string} url - URL to extract from
   * @returns {string|null} Package name or null if not found
   */
  extractPackageNameFromUrl(url) {
    try {
      const urlObj = new URL(url);
      
      // Try to extract from hostname
      // e.g., reactjs.org -> react, lodash.com -> lodash
      const hostnameParts = urlObj.hostname.split('.');
      if (hostnameParts.length >= 2) {
        const domain = hostnameParts[hostnameParts.length - 2];
        if (!['github', 'gitlab', 'bitbucket', 'npmjs', 'readthedocs'].includes(domain)) {
          // Remove common suffixes
          return domain.replace(/(js|docs|api|dev)$/, '');
        }
      }
      
      // Try to extract from path
      // e.g., /docs/react/ -> react, /en/latest/django/ -> django
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      for (const part of pathParts) {
        // Skip common path segments
        if (!['docs', 'doc', 'api', 'en', 'latest', 'stable', 'master', 'main'].includes(part)) {
          return part;
        }
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Extract version from URL
   * @param {string} url - URL to extract from
   * @returns {string|null} Version or null if not found
   */
  extractVersionFromUrl(url) {
    try {
      const urlObj = new URL(url);
      
      // Look for version patterns in path
      // e.g., /v12.0/, /1.2.3/, /en/2.0/
      const versionRegex = /\/(v?)((\d+)(\.\d+)*)(\.\d+)?(?:[-_]?([a-zA-Z]+\d*))?(?=\/|$)/;
      const match = urlObj.pathname.match(versionRegex);
      
      if (match) {
        return match[1] + match[2] + (match[5] || '') + (match[6] ? `-${match[6]}` : '');
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Analyze package.json to find documentation for all dependencies
   * @param {string} packageJsonPath - Path to package.json file
   * @returns {Promise<Array>} Array of dependency documentation info
   */
  async analyzeDependencies(packageJsonPath) {
    try {
      const packageJson = await fs.readJson(packageJsonPath);
      const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      const results = [];
      
      for (const [name, versionSpec] of Object.entries(dependencies)) {
        // Extract actual version from version spec (e.g., "^1.2.3" -> "1.2.3")
        const version = versionSpec.replace(/[\^~]/g, '');
        
        const docInfo = await this.findVersionDocUrl(name, version);
        results.push({
          package: name,
          version: version,
          ...docInfo
        });
      }
      
      return results;
    } catch (error) {
      console.error(`Error analyzing dependencies:`, error);
      throw error;
    }
  }
}

module.exports = LocalRegistryLookup;
