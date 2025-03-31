#!/usr/bin/env node --no-warnings

require('dotenv').config();
const LocalRegistryLookup = require('./src/LocalRegistryLookup');
const DocsToMarkdown = require('./src/DocsToMarkdown');
const DocSlurper = require('./src/DocSlurper');
const path = require('path');
const fs = require('fs-extra');

/**
 * SlurpAI - Documentation scraper for AI systems
 * Finds package documentation by name and version, then scrapes it into a structured format
 */

// Command line argument parsing
const args = process.argv.slice(2);
const command = args[0]; // The command (read, fetch, list, etc.)
const params = {};

// Parse remaining command line arguments for flags/options
let i = 1;
// Skip the package name and optional version for commands that use them
if (['read', 'fetch', 'purge'].includes(command)) {
  // Skip package name
  if (i < args.length && !args[i].startsWith('--')) {
    i++;
    // Skip version if present
    if (i < args.length && !args[i].startsWith('--')) {
      i++;
    }
  }
}
// Skip the package.json path for the check command
if (command === 'check' && i < args.length && !args[i].startsWith('--')) {
  i++;
}

// Now parse the remaining arguments as flags/options
for (; i < args.length; i++) {
  const arg = args[i];
  
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    // Check if the next arg is a value or another flag
    if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
      params[key] = args[i + 1];
      i++; // Skip the next arg as we've consumed it
    } else {
      params[key] = true; // Flag without value
    }
  }
}

async function main() {
  console.log('\n======== SlurpAI Documentation Scraper ========\n');
  
  // Handle commands based on the CLI format in project.md
  switch(command) {
    case 'read':
      // Read local documentation: slurp read <package> [version]
      const readPackage = args[1];
      const readVersion = args[2]; // Optional
      
      if (!readPackage) {
        console.error('❌ Missing package name. Usage: slurp read <package> [version]');
        return;
      }
      
      // Read local documentation implementation
      console.log(`Reading local documentation for ${readPackage}${readVersion ? `@${readVersion}` : ''}`);
      // TODO: Implement reading from local documentation
      break;
      
    case 'fetch':
      // Find and download documentation: slurp fetch <package|url> [version]
      const fetchArg = args[1];
      let fetchVersion = null;
      
      // Only treat arg2 as version if it doesn't start with --
      if (args[2] && !args[2].startsWith('--')) {
        fetchVersion = args[2];
      }
      
      if (!fetchArg) {
        console.error('❌ Missing package name or URL. Usage: slurp fetch <package|url> [version]');
        return;
      }
      
      // Check if the argument is a URL
      if (isUrl(fetchArg)) {
        console.log(`Detected URL: ${fetchArg}`);
        // Use direct URL scraping
        await scrapeFromUrl(fetchArg, null, fetchVersion);
      } else {
        // Use existing package documentation scraper
        await scrapePackageDocumentation(fetchArg, fetchVersion);
      }
      break;
      
    case 'list':
      // List locally available documentation: slurp list
      console.log('Listing locally available documentation');
      
      // Use path for docs directory
      const docsDir = params.output || path.join(__dirname, 'slurps_docs');
      
      try {
        // Check if docs directory exists
        if (!await fs.pathExists(docsDir)) {
          console.log('\n❌ No documentation directory found at:', docsDir);
          console.log('Run "slurp fetch <package>" to download documentation first.');
          return;
        }
        
        // Read the docs directory structure
        const packages = await fs.readdir(docsDir);
        
        if (packages.length === 0) {
          console.log('\n❌ No documentation available yet.');
          console.log('Run "slurp fetch <package>" to download documentation first.');
          return;
        }
        
        console.log(`\nFound documentation for ${packages.length} packages:`);
        console.log('\n| Package | Versions | Last Updated |');
        console.log('|---------|----------|--------------|');
        
        // List all packages and their versions
        for (const pkg of packages) {
          const pkgPath = path.join(docsDir, pkg);
          const stats = await fs.stat(pkgPath);
          
          // Skip if not a directory
          if (!stats.isDirectory()) continue;
          
          // Get available versions
          const versions = await fs.readdir(pkgPath);
          const versionStr = versions.join(', ');
          
          // Get the most recent update time across all version directories
          let latestTime = new Date(0);
          for (const version of versions) {
            const versionPath = path.join(pkgPath, version);
            const versionStats = await fs.stat(versionPath);
            if (versionStats.mtime > latestTime) {
              latestTime = versionStats.mtime;
            }
          }
          
          // Format the last updated time
          const lastUpdated = latestTime.toISOString().split('T')[0];
          
          console.log(`| ${pkg} | ${versionStr} | ${lastUpdated} |`);
        }
        
        console.log('\nUse "slurp read <package> <version>" to read documentation.');
      } catch (error) {
        console.error(`❌ Error listing documentation: ${error.message}`);
      }
      break;
      
    case 'check':
      // Check all dependencies in package.json: slurp check [package.json path]
      const packageJsonPath = args[1] || './package.json'; // Default to local package.json
      
      // Use existing package.json analyzer
      await scrapeFromPackageJson(packageJsonPath);
      break;
      
    case 'purge':
      // Remove documentation from cache: slurp purge [package] [version]
      const purgePackage = args[1];
      const purgeVersion = args[2]; // Optional
      
      // Use purge documentation function
      await purgeDocumentation(purgePackage, purgeVersion);
      break;
      
    // Legacy support for original parameter style
    default:
      if (params.package) {
        // Package-based operation
        await scrapePackageDocumentation(params.package, params.version);
      } else if (params.url) {
        // URL-based operation
        await scrapeFromUrl(params.url, params.library, params.version);
      } else if (params['package-json']) {
        // Project analysis operation
        await scrapeFromPackageJson(params['package-json']);
      } else {
        // Display help
        showHelp();
      }
  }
}

/**
 * Check if a string is a URL
 * @param {string} str - String to check
 * @returns {boolean} True if the string is a URL
 */
function isUrl(str) {
  try {
    // Check if it starts with http:// or https://
    return str.startsWith('http://') || str.startsWith('https://');
  } catch (error) {
    return false;
  }
}

/**
 * Get package version from local package.json
 * @param {string} packageName - Name of the package to look for
 * @param {string} packageJsonPath - Path to package.json file (default: './package.json')
 * @returns {Promise<string|null>} Version string or null if not found
 */
async function getVersionFromPackageJson(packageName, packageJsonPath = './package.json') {
  try {
    // Check if package.json exists
    if (!await fs.pathExists(packageJsonPath)) {
      return null;
    }
    
    // Read package.json
    const packageJson = await fs.readJson(packageJsonPath);
    const dependencies = { 
      ...packageJson.dependencies, 
      ...packageJson.devDependencies 
    };
    
    // Check if package exists in dependencies
    if (dependencies[packageName]) {
      // Extract actual version from version spec (e.g., "^1.2.3" -> "1.2.3")
      return dependencies[packageName].replace(/[\^~]/g, '');
    }
    
    return null;
  } catch (error) {
    console.error(`Error reading package.json: ${error.message}`);
    return null;
  }
}

/**
 * Purge documentation from the cache
 * @param {string} packageName - Name of the package to purge (optional)
 * @param {string} version - Version of the package to purge (optional)
 */
async function purgeDocumentation(packageName, version) {
  const docsDir = params.output || path.join(__dirname, 'slurps_docs');
  const registryPath = path.join(__dirname, 'data/doc_sites.json');
  
  try {
    // Check if docs directory exists
    if (!await fs.pathExists(docsDir)) {
      console.log('❌ No documentation directory found.');
      return;
    }
    
    // If no package specified, purge all
    if (!packageName) {
      console.log('Purging all documentation...');
      await fs.emptyDir(docsDir);
      
      // Also delete the registry file if it exists
      if (await fs.pathExists(registryPath)) {
        console.log('Deleting documentation registry...');
        await fs.remove(registryPath);
      }
      
      console.log('✅ All documentation and registry purged successfully.');
      return;
    }
    
    // Check if package directory exists
    const packageDir = path.join(docsDir, packageName);
    if (!await fs.pathExists(packageDir)) {
      console.log(`❌ No documentation found for ${packageName}.`);
      return;
    }
    
    // If no version specified, purge all versions of the package
    if (!version) {
      console.log(`Purging all documentation for ${packageName}...`);
      await fs.remove(packageDir);
      
      // Update the registry file if it exists
      if (await fs.pathExists(registryPath)) {
        try {
          const registryData = await fs.readJson(registryPath);
          if (registryData.docSites) {
            // Filter out the purged package
            registryData.docSites = registryData.docSites.filter(site => 
              site.name.toLowerCase() !== packageName.toLowerCase());
            await fs.writeJson(registryPath, registryData, { spaces: 2 });
            console.log(`Updated documentation registry.`);
          }
        } catch (regError) {
          console.log(`Note: Could not update registry: ${regError.message}`);
        }
      }
      
      console.log(`✅ Documentation for ${packageName} purged successfully.`);
      return;
    }
    
    // Check if version directory exists
    const versionDir = path.join(packageDir, version);
    if (!await fs.pathExists(versionDir)) {
      console.log(`❌ No documentation found for ${packageName}@${version}.`);
      return;
    }
    
    // Purge specific version
    console.log(`Purging documentation for ${packageName}@${version}...`);
    await fs.remove(versionDir);
    
    // Check if there are any other versions left
    const remainingVersions = await fs.readdir(packageDir);
    if (remainingVersions.length === 0) {
      // If no versions left, remove the package directory and update registry
      await fs.remove(packageDir);
      
      // Update the registry file if it exists
      if (await fs.pathExists(registryPath)) {
        try {
          const registryData = await fs.readJson(registryPath);
          if (registryData.docSites) {
            // Filter out the purged package
            registryData.docSites = registryData.docSites.filter(site => 
              site.name.toLowerCase() !== packageName.toLowerCase());
            await fs.writeJson(registryPath, registryData, { spaces: 2 });
            console.log(`Updated documentation registry.`);
          }
        } catch (regError) {
          console.log(`Note: Could not update registry: ${regError.message}`);
        }
      }
    }
    
    console.log(`✅ Documentation for ${packageName}@${version} purged successfully.`);
    
  } catch (error) {
    console.error(`❌ Error purging documentation: ${error.message}`);
  }
}

/**
 * Scrape documentation for a specific package and version
 * @param {string} packageName - Name of the package
 * @param {string} version - Version of the package (optional)
 */
async function scrapePackageDocumentation(packageName, version) {
  console.log(`Finding documentation for ${packageName}${version ? `@${version}` : ''}...`);
  
  try {
    // If no version is provided, try to get it from package.json
    if (!version) {
      const packageJsonVersion = await getVersionFromPackageJson(packageName);
      if (packageJsonVersion) {
        console.log(`Found version ${packageJsonVersion} in package.json`);
        version = packageJsonVersion;
      }
    }
    
    // Find documentation URL
    const registryLookup = new LocalRegistryLookup();
    const docInfo = await registryLookup.findVersionDocUrl(packageName, version);
    
    if (!docInfo.found) {
      console.error(`❌ ${docInfo.message}`);
      return;
    }
    
    console.log(`✅ ${docInfo.message}`);
    console.log(`URL: ${docInfo.url}`);
    console.log(`Version match: ${docInfo.exactMatch ? 'Exact' : 'Approximate'}`);
    
    // Ask for confirmation to start scraping
    if (!params.yes) {
      console.log('\nDo you want to scrape this documentation? (Y/n)');
      const answer = await waitForInput();
      
      if (answer && answer.toLowerCase() !== 'y') {
        console.log('Scraping canceled.');
        return;
      }
    }
    
    // Scrape the documentation
    console.log(`\nStarting documentation scraping for ${packageName}...`);
    
      // Configure the scraper
      const scrapeConfig = {
        baseUrl: docInfo.url,
        outputDir: params.output || path.join(__dirname, 'slurps_docs'),
        // Use CLI param first, then env var, then default to 20
        // CLI: --max parameter
        // ENV: MAX_PAGES_PER_SITE from .env
        maxPages: parseInt(params.max || process.env.MAX_PAGES_PER_SITE || '20', 10),
        useHeadless: params.headless !== 'false',
      
      // Set library information
      libraryInfo: {
        library: packageName,
        version: version || docInfo.packageInfo.latestVersion,
        exactVersionMatch: docInfo.exactMatch
      },
      
      // Default content selectors (can be improved with site-specific selectors)
      contentSelector: 'main, .content, .document, article, .documentation, .main-content',
      excludeSelectors: [
        'nav',
        '.navigation',
        '.sidebar',
        '.menu',
        '.toc',
        'footer',
        '.footer',
        'script',
        'style',
        '.headerlink'
      ],
      
      // Domain restrictions
      allowedDomains: [new URL(docInfo.url).hostname],
      
      // Async queue options
      concurrency: parseInt(params.concurrency || '5', 10),
      retryCount: parseInt(params['retry-count'] || '3', 10),
      retryDelay: parseInt(params['retry-delay'] || '1000', 10)
    };
    
    const scraper = new DocsToMarkdown(scrapeConfig);
    await scraper.start();
    
    console.log('\n✅ Documentation scraping completed successfully!');
    console.log(`Markdown files have been saved to: ${path.join(scrapeConfig.outputDir, packageName, version || docInfo.packageInfo.latestVersion)}`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

/**
 * Scrape documentation from a specific URL
 * @param {string} url - URL to scrape
 * @param {string} library - Library name (optional)
 * @param {string} version - Version (optional)
 */
async function scrapeFromUrl(url, library, version) {
  console.log(`Scraping documentation from ${url}...`);
  
  try {
    // Generate library name from URL if not provided
    const urlObj = new URL(url);
    const generatedLibrary = library || extractNameFromUrl(url);
    
    // Create a better directory structure based on the URL path
    const pathSegments = urlObj.pathname.split('/').filter(Boolean);
    const siteName = urlObj.hostname.split('.')[0]; // e.g., "modelcontextprotocol" from "modelcontextprotocol.io"
    
    // Base output directory
    const baseOutputDir = params.output || path.join(__dirname, 'slurps_docs');
    
    // Create a structured output path that mirrors the URL structure
    let structuredOutputDir = path.join(baseOutputDir, siteName);
    
    // Add version to path if provided
    if (version) {
      structuredOutputDir = path.join(structuredOutputDir, version);
    }
    
    // Configure the scraper
    const scrapeConfig = {
      baseUrl: url,
      outputDir: structuredOutputDir,
      // Use CLI param first, then env var, then default
      maxPages: parseInt(params.max || process.env.MAX_PAGES_PER_SITE || '20', 10),
      useHeadless: params.headless !== 'false',
      
      // Set library information if provided
      libraryInfo: {
        library: generatedLibrary,
        version: version || '',
        exactVersionMatch: false,
        sourceType: 'url'
      },
      
      // Default content selectors (can be improved with site-specific selectors)
      contentSelector: 'main, .content, .document, article, .documentation, .main-content',
      excludeSelectors: [
        'nav',
        '.navigation',
        '.sidebar',
        '.menu',
        '.toc',
        'footer',
        '.footer',
        'script',
        'style',
        '.headerlink'
      ],
      
      // Domain restrictions
      allowedDomains: [urlObj.hostname],
      
      // Async queue options
      concurrency: parseInt(params.concurrency || '5', 10),
      retryCount: parseInt(params['retry-count'] || '3', 10),
      retryDelay: parseInt(params['retry-delay'] || '1000', 10)
    };
    
    // Custom filename generator to create a better file structure
    scrapeConfig.getFilenameForUrl = function(pageUrl) {
      try {
        const pageUrlObj = new URL(pageUrl);
        const pagePath = pageUrlObj.pathname;
        
        // If it's the base URL with no path or just a trailing slash
        if (pagePath === '/' || pagePath === '') {
          return 'index.md';
        }
        
        // Remove leading and trailing slashes and split into segments
        const segments = pagePath.replace(/^\/|\/$/g, '').split('/');
        
        // Create directories based on path segments
        let currentDir = this.outputDir;
        for (let i = 0; i < segments.length - 1; i++) {
          currentDir = path.join(currentDir, segments[i]);
          fs.ensureDirSync(currentDir);
        }
        
        // Last segment becomes the filename
        const lastSegment = segments[segments.length - 1] || 'index';
        
        // Return the full path including directories
        const relativePath = segments.slice(0, -1).join('/');
        const filename = lastSegment + '.md';
        
        return relativePath ? path.join(relativePath, filename) : filename;
      } catch (error) {
        // Fallback to a safe filename
        return `page-${Date.now()}.md`;
      }
    };
    
    // Add to registry for future reference
    try {
      const registryLookup = new LocalRegistryLookup();
      await registryLookup.addUrlToRegistry(url, generatedLibrary, version);
      console.log(`Added ${url} to registry as "${generatedLibrary}"`);
    } catch (regError) {
      console.warn(`Note: Could not add to registry: ${regError.message}`);
    }
    
    const scraper = new DocsToMarkdown(scrapeConfig);
    await scraper.start();
    
    console.log('\n✅ Documentation scraping completed successfully!');
    console.log(`Markdown files have been saved to: ${structuredOutputDir}`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

/**
 * Extract a name from a URL for use as a library name
 * @param {string} url - URL to extract name from
 * @returns {string} Extracted name
 */
function extractNameFromUrl(url) {
  try {
    const urlObj = new URL(url);
    
    // Try to get a meaningful name from the path
    const pathSegments = urlObj.pathname.split('/').filter(Boolean);
    
    if (pathSegments.length > 0) {
      // Use the last meaningful path segment
      for (let i = pathSegments.length - 1; i >= 0; i--) {
        const segment = pathSegments[i];
        // Skip common segments like 'docs', 'api', etc.
        if (!['docs', 'documentation', 'api', 'reference', 'guide', 'introduction'].includes(segment.toLowerCase())) {
          return segment;
        }
      }
      // If all segments are common, use the last one
      return pathSegments[pathSegments.length - 1];
    }
    
    // If no path segments, use the hostname without TLD
    const hostParts = urlObj.hostname.split('.');
    if (hostParts.length >= 2) {
      // Remove common TLDs and subdomains
      const domain = hostParts[hostParts.length - 2];
      return domain;
    }
    
    // Fallback to full hostname
    return urlObj.hostname.replace(/\./g, '-');
  } catch (error) {
    // Generate a timestamp-based name as fallback
    return `doc-${Date.now()}`;
  }
}

/**
 * Analyze package.json and scrape documentation for dependencies
 * @param {string} packageJsonPath - Path to package.json file
 */
async function scrapeFromPackageJson(packageJsonPath) {
  console.log(`Analyzing dependencies in ${packageJsonPath}...`);
  
  try {
    // Normalize the path
    const normalizedPath = path.resolve(packageJsonPath);
    
    // Check if the file exists
    if (!await fs.pathExists(normalizedPath)) {
      console.error(`❌ File not found: ${normalizedPath}`);
      return;
    }
    
    // Analyze dependencies
    const registryLookup = new LocalRegistryLookup();
    const dependencies = await registryLookup.analyzeDependencies(normalizedPath);
    
    console.log(`\nFound ${dependencies.length} dependencies in ${packageJsonPath}`);
    
    // Display dependencies in a simple format
    console.log('\nDependency Analysis:');
    console.log('-------------------');
    
    // Filter to found dependencies
    const foundDeps = dependencies.filter(dep => dep.found);
    
    // Display summary
    for (const dep of dependencies) {
      const status = dep.found ? '✅' : '❌';
      const confidence = dep.exactMatch ? 'EXACT' : (dep.found ? 'CLOSE' : 'N/A');
      console.log(`${status} ${dep.package}@${dep.version} - ${dep.found ? 'Documentation available' : 'No documentation found'} (${confidence})`);
    }
    
    console.log(`\nSummary: Found documentation for ${foundDeps.length} out of ${dependencies.length} dependencies.`);
    
    if (foundDeps.length === 0) {
      console.log('\n❌ No documentation found for any dependencies.');
      return;
    }
    
    // Determine which dependencies to scrape
    let packagesToScrape = [];
    
    if (params.yes) {
      // Auto-scrape all dependencies with --yes flag
      packagesToScrape = foundDeps;
      console.log(`\nAuto-scraping documentation for ${packagesToScrape.length} packages...`);
    } else {
      // Ask which dependencies to scrape
      console.log('\nDo you want to scrape documentation for these packages? (all/none/comma-separated list)');
      const answer = await waitForInput();
      
      if (!answer || answer.toLowerCase() === 'none') {
        console.log('Scraping canceled.');
        return;
      }
      
      if (answer.toLowerCase() === 'all') {
        packagesToScrape = foundDeps;
      } else {
        // Parse comma-separated list
        const packageNames = answer.split(',').map(name => name.trim());
        packagesToScrape = foundDeps.filter(dep => packageNames.includes(dep.package));
      }
      
      console.log(`\nScraping documentation for ${packagesToScrape.length} packages...`);
    }
    
    // Scrape selected dependencies
    let downloadedCount = 0;
    const startTime = Date.now();
    
    for (const dep of packagesToScrape) {
      console.log(`\n[${dep.package}] Fetching documentation...`);
      
      try {
        // Find documentation URL
        const docInfo = await registryLookup.findVersionDocUrl(dep.package, dep.version);
        
        if (!docInfo.found) {
          console.log(`[${dep.package}] ❌ Failed: No documentation found`);
          continue;
        }
        
        // Display info
        const confidence = docInfo.exactMatch ? 'EXACT' : 'CLOSE';
        const docVersion = docInfo.packageInfo?.latestVersion || dep.version;
        
        console.log(`[${dep.package}] Found documentation at: ${docInfo.url}`);
        console.log(`[${dep.package}] Version match: ${confidence}, Doc version: ${docVersion}`);
        console.log(`[${dep.package}] Downloading...`);
        
        // Configure the scraper
        const scrapeConfig = {
          baseUrl: docInfo.url,
          outputDir: params.output || path.join(__dirname, 'slurps_docs'),
          // Use CLI param first, then env var, then default
          maxPages: parseInt(params.max || process.env.MAX_PAGES_PER_SITE || '20', 10),
          useHeadless: params.headless !== 'false',
          
          // Set library information
          libraryInfo: {
            library: dep.package,
            version: dep.version || docInfo.packageInfo?.latestVersion,
            exactVersionMatch: docInfo.exactMatch
          },
          
          // Default content selectors
          contentSelector: 'main, .content, .document, article, .documentation, .main-content',
          excludeSelectors: [
            'nav', '.navigation', '.sidebar', '.menu', '.toc', 
            'footer', '.footer', 'script', 'style', '.headerlink'
          ],
          
          // Domain restrictions
          allowedDomains: [new URL(docInfo.url).hostname],
          
          // Async queue options
          concurrency: parseInt(params.concurrency || '5', 10),
          retryCount: parseInt(params['retry-count'] || '3', 10),
          retryDelay: parseInt(params['retry-delay'] || '1000', 10)
        };
        
        const scraper = new DocsToMarkdown(scrapeConfig);
        
        // Listen for progress events
        scraper.on('init', (data) => {
          console.log(`[${dep.package}] Initialized scraper, max pages: ${data.maxPages}`);
        });
        
        scraper.on('progress', (data) => {
          if (data.type === 'processing') {
            // Only log every 5th page to avoid console spam
            if (data.processed % 5 === 0 || data.processed === 1) {
              console.log(`[${dep.package}] Processing page ${data.processed}/${data.maxPages || 'unlimited'}`);
            }
          } else if (data.type === 'saved') {
            // Only log every 5th save to avoid console spam
            if (data.progress % 20 === 0 || data.progress >= 95) {
              console.log(`[${dep.package}] Saving progress: ${Math.floor(data.progress)}%`);
            }
          }
        });
        
        scraper.on('complete', (stats) => {
          downloadedCount++;
          console.log(`[${dep.package}] ✅ Downloaded ${stats.processed} pages in ${stats.duration.toFixed(1)}s`);
        });
        
        // Start scraping
        await scraper.start();
        
      } catch (error) {
        console.log(`[${dep.package}] ❌ Failed: ${error.message}`);
      }
    }
    
    // Display final summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n✅ Documentation check completed in ${duration}s`);
    console.log(`Found: ${foundDeps.length}/${dependencies.length} packages`);
    console.log(`Downloaded: ${downloadedCount} package(s)`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

/**
 * Wait for user input
 * @returns {Promise<string>} User input
 */
function waitForInput() {
  return new Promise(resolve => {
    const stdin = process.stdin;
    stdin.resume();
    stdin.setEncoding('utf8');
    
    stdin.on('data', function (data) {
      resolve(data.trim());
      stdin.pause();
    });
  });
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
SlurpAI Documentation Scraper

Usage:
  slurp <command> [arguments] [options]

Commands:
  read <package> [version]      Read local documentation
  fetch <package|url> [version] Find and download documentation
  list                          List locally available documentation
  check [package.json path]     Check all dependencies in package.json
  purge [package] [version]     Remove documentation from cache

Examples:
  Read local documentation:
    slurp read express 4.18.2

  Find and download documentation (package):
    slurp fetch react 18.2.0

  Find and download documentation (URL):
    slurp fetch https://modelcontextprotocol.io/introduction

  List available documentation:
    slurp list

  Check dependencies:
    slurp check ./package.json

  Purge documentation:
    slurp purge express 4.18.2

Legacy Usage (still supported):
  slurp --package <package-name> [--version <version>] [options]
  slurp --url <documentation-url> [--library <name>] [--version <version>] [options]
  slurp --package-json <path-to-package.json> [options]

Options:
  --output <dir>           Output directory (default: ./slurps_docs)
  --max <number>           Maximum pages to scrape (default: 20)
  --headless <boolean>     Use headless browser (default: true)
  --concurrency <number>   Number of concurrent pages (default: 5)
  --retry-count <number>   Number of retries for failed requests (default: 3)
  --retry-delay <number>   Delay between retries in ms (default: 1000)
  --yes                    Skip confirmation prompts
  `);
}

// Run the script
main().catch(console.error);
