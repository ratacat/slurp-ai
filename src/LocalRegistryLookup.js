const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

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
      const data = await fs.readJson(this.registryPath);
      this.registry = data.docSites;
      return this.registry;
    } catch (error) {
      console.error('Error loading doc site registry:', error);
      throw error;
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
