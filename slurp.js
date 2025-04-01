#!/usr/bin/env node --no-warnings

require('dotenv').config();
const LocalRegistryLookup = require('./src/LocalRegistryLookup');
const DocsToMarkdown = require('./src/DocsToMarkdown');
const DocSlurper = require('./src/DocSlurper');
const { MarkdownCompiler } = require('./src/MarkdownCompiler');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk') || { green: (s) => s, red: (s) => s, yellow: (s) => s, blue: (s) => s, gray: (s) => s };

/**
 * SlurpAI - Documentation scraper for AI systems
 * Finds package documentation by name and version, then scrapes it into a structured format
 */

// Command line argument parsing
const args = process.argv.slice(2);
const command = args[0]; // The command (read, fetch, list, etc.)
const params = {};

// Logging configuration
const verbose = process.env.SLURP_VERBOSE === 'true' || false;

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

/**
 * Logging utility functions
 */
const log = {
  // Always show these logs
  info: (message) => console.log(message),
  success: (message) => console.log(chalk.green(`✅ ${message}`)),
  error: (message) => console.error(chalk.red(`❌ ${message}`)),
  warn: (message) => console.log(chalk.yellow(`⚠️ ${message}`)),
  
  // Only show in verbose mode
  verbose: (message) => {
    if (verbose || params.verbose) {
      console.log(chalk.gray(`[INFO] ${message}`));
    }
  },
  
  // Progress updates - only show occasionally
  progress: (message, force = false) => {
    if (force || verbose || params.verbose) {
      console.log(chalk.blue(`[PROGRESS] ${message}`));
    }
  },
  
  // Summary at the end of operations
  summary: (title, items) => {
    console.log(`\n${title}:`);
    for (const [key, value] of Object.entries(items)) {
      console.log(`${key}: ${value}`);
    }
  }
};

async function main() {
  log.info('\n======== SlurpAI Documentation Scraper ========\n');
  
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
        log.verbose(`Detected URL: ${fetchArg}`);
        // Use direct URL scraping
        await scrapeFromUrl(fetchArg, null, fetchVersion);
      } else {
        // Use existing package documentation scraper
        await scrapePackageDocumentation(fetchArg, fetchVersion);
      }
      break;
      
    case 'list':
      // List locally available documentation: slurp list
      log.info('Listing locally available documentation');
      
      // Use path for docs directory
      const docsDir = params.output || path.join(__dirname, 'slurps_docs');
      
      try {
        // Check if docs directory exists
        if (!await fs.pathExists(docsDir)) {
          log.error(`No documentation directory found at: ${docsDir}`);
          log.info('Run "slurp fetch <package>" to download documentation first.');
          return;
        }
        
        // Read the docs directory structure
        const packages = await fs.readdir(docsDir);
        
        if (packages.length === 0) {
          log.error('No documentation available yet.');
          log.info('Run "slurp fetch <package>" to download documentation first.');
          return;
        }
        
        log.info(`\nFound documentation for ${packages.length} packages:`);
        log.info('\n| Package | Versions | Last Updated |');
        log.info('|---------|----------|--------------|');
        
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
          
          log.info(`| ${pkg} | ${versionStr} | ${lastUpdated} |`);
        }
        
        log.info('\nUse "slurp read <package> <version>" to read documentation.');
      } catch (error) {
        log.error(`Error listing documentation: ${error.message}`);
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
      
    case 'compile':
      // Compile documentation: slurp compile [options]
      log.info('Compiling documentation...');
      
      // Parse compile-specific options
      const compileOptions = {
        basePath: params['base-path'],
        inputDir: params.input,
        outputFile: params.output,
        preserveMetadata: params['preserve-metadata'] !== 'false',
        removeNavigation: params['remove-navigation'] !== 'false',
        removeDuplicates: params['remove-duplicates'] !== 'false'
      };
      
      // Handle exclude patterns if provided
      if (params.exclude) {
        try {
          compileOptions.excludePatterns = JSON.parse(params.exclude).map(pattern => new RegExp(pattern, 'gi'));
        } catch (error) {
          console.error('Error parsing exclude patterns:', error.message);
          return;
        }
      }
      
      try {
        // Create compiler instance
        const compiler = new MarkdownCompiler(compileOptions);
        
        // Run compilation
        const result = await compiler.compile();
        
        // Display results
        log.success('Compilation complete!');
        log.info(`Output file: ${result.outputFile}`);
        
        log.summary('Statistics', {
          'Libraries processed': result.stats.totalLibraries,
          'Versions processed': result.stats.totalVersions,
          'Total files found': result.stats.totalFiles,
          'Files processed': result.stats.processedFiles,
          'Files skipped': result.stats.skippedFiles,
          'Duplicates removed': result.stats.duplicatesRemoved
        });
        
        // Check if any files were processed
        if (result.stats.processedFiles === 0) {
          log.warn('No files were processed. This could be because:');
          log.info('- The input directory is empty');
          log.info('- No markdown files were found');
          log.info('- All files were filtered out as duplicates');
          log.info('\nCheck your input directory and try again.');
        } else {
          log.success(`Successfully compiled ${result.stats.processedFiles} files into ${result.outputFile}`);
        }
      } catch (error) {
        log.error(`Error during compilation: ${error.message}`);
      }
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
      log.error('No documentation directory found.');
      return;
    }
    
    // If no package specified, purge all
    if (!packageName) {
      log.info('Purging all documentation...');
      await fs.emptyDir(docsDir);
      
      // Also delete the registry file if it exists
      if (await fs.pathExists(registryPath)) {
        log.verbose('Deleting documentation registry...');
        await fs.remove(registryPath);
      }
      
      log.success('All documentation and registry purged successfully.');
      return;
    }
    
    // Check if package directory exists
    const packageDir = path.join(docsDir, packageName);
    if (!await fs.pathExists(packageDir)) {
      log.error(`No documentation found for ${packageName}.`);
      return;
    }
    
    // If no version specified, purge all versions of the package
    if (!version) {
      log.info(`Purging all documentation for ${packageName}...`);
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
            log.verbose(`Updated documentation registry.`);
          }
        } catch (regError) {
          log.verbose(`Note: Could not update registry: ${regError.message}`);
        }
      }
      
      log.success(`Documentation for ${packageName} purged successfully.`);
      return;
    }
    
    // Check if version directory exists
    const versionDir = path.join(packageDir, version);
    if (!await fs.pathExists(versionDir)) {
      log.error(`No documentation found for ${packageName}@${version}.`);
      return;
    }
    
    // Purge specific version
    log.info(`Purging documentation for ${packageName}@${version}...`);
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
            log.verbose(`Updated documentation registry.`);
          }
        } catch (regError) {
          log.verbose(`Note: Could not update registry: ${regError.message}`);
        }
      }
    }
    
    log.success(`Documentation for ${packageName}@${version} purged successfully.`);
    
  } catch (error) {
    log.error(`Error purging documentation: ${error.message}`);
  }
}

/**
 * Scrape documentation for a specific package and version
 * @param {string} packageName - Name of the package
 * @param {string} version - Version of the package (optional)
 */
async function scrapePackageDocumentation(packageName, version) {
  log.info(`Finding documentation for ${packageName}${version ? `@${version}` : ''}...`);
  
  try {
    // If no version is provided, try to get it from package.json
    if (!version) {
      const packageJsonVersion = await getVersionFromPackageJson(packageName);
      if (packageJsonVersion) {
        log.verbose(`Found version ${packageJsonVersion} in package.json`);
        version = packageJsonVersion;
      }
    }
    
    // Find documentation URL
    const registryLookup = new LocalRegistryLookup();
    const docInfo = await registryLookup.findVersionDocUrl(packageName, version);
    
    if (!docInfo.found) {
      log.error(docInfo.message);
      return;
    }
    
    log.success(`${docInfo.message} (${docInfo.exactMatch ? 'Exact match' : 'Approximate match'})`);
    log.verbose(`URL: ${docInfo.url}`);
    
    // Ask for confirmation to start scraping
    if (!params.yes) {
      log.info('\nDo you want to scrape this documentation? (Y/n)');
      const answer = await waitForInput();
      
      if (answer && answer.toLowerCase() !== 'y') {
        log.info('Scraping canceled.');
        return;
      }
    }
    
    // Scrape the documentation
    log.info(`Starting documentation scraping for ${packageName}...`);
    
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
      concurrency: parseInt(params.concurrency ||  10),
      retryCount: parseInt(params['retry-count'] || '3'),
      retryDelay: parseInt(params['retry-delay'] || '1000')
    };
    
    const scraper = new DocsToMarkdown(scrapeConfig);
    
    // Configure scraper to use our logging system
    scraper.on('init', (data) => {
      log.verbose(`Initialized scraper for ${packageName}, max pages: ${data.maxPages}`);
    });
    
    scraper.on('progress', (data) => {
      if (data.type === 'processing') {
        // Only log occasionally to reduce noise
        if (data.processed % 10 === 0 || data.processed === 1) {
          log.progress(`Processing page ${data.processed}/${data.maxPages || 'unlimited'} (Queue: ${data.queueSize})`, data.processed === 1);
        }
      } else if (data.type === 'saved') {
        // Only log major milestones
        if (data.progress % 25 === 0 || data.progress >= 95) {
          log.progress(`Saving progress: ${Math.floor(data.progress)}%`);
        }
      }
    });
    
    scraper.on('complete', (stats) => {
      log.summary('Scraping Stats', {
        'Pages processed': stats.processed,
        'Failed pages': stats.failed,
        'Duration': `${stats.duration.toFixed(1)}s`,
        'Pages per second': stats.pagesPerSecond
      });
    });
    
    await scraper.start();
    
    log.success('Documentation scraping completed successfully!');
    log.info(`Markdown files have been saved to: ${path.join(scrapeConfig.outputDir, packageName, version || docInfo.packageInfo.latestVersion)}`);
    
  } catch (error) {
    log.error(`Error: ${error.message}`);
  }
}

/**
 * Scrape documentation from a specific URL
 * @param {string} url - URL to scrape
 * @param {string} library - Library name (optional)
 * @param {string} version - Version (optional)
 */
async function scrapeFromUrl(url, library, version) {
  log.info(`Scraping documentation from ${url}...`);
  
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
      concurrency: parseInt(params.concurrency || 10),
      retryCount: parseInt(params['retry-count'] || '3'),
      retryDelay: parseInt(params['retry-delay'] || '1000')
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
      log.verbose(`Added ${url} to registry as "${generatedLibrary}"`);
    } catch (regError) {
      log.verbose(`Note: Could not add to registry: ${regError.message}`);
    }
    
    const scraper = new DocsToMarkdown(scrapeConfig);
    
    // Configure scraper to use our logging system
    scraper.on('init', (data) => {
      log.verbose(`Initialized scraper for ${url}, max pages: ${data.maxPages}`);
    });
    
    scraper.on('progress', (data) => {
      if (data.type === 'processing') {
        // Only log occasionally to reduce noise
        if (data.processed % 10 === 0 || data.processed === 1) {
          log.progress(`Processing page ${data.processed}/${data.maxPages || 'unlimited'} (Queue: ${data.queueSize})`, data.processed === 1);
        }
      } else if (data.type === 'saved') {
        // Only log major milestones
        if (data.progress % 25 === 0 || data.progress >= 95) {
          log.progress(`Saving progress: ${Math.floor(data.progress)}%`);
        }
      }
    });
    
    scraper.on('complete', (stats) => {
      log.summary('Scraping Stats', {
        'Pages processed': stats.processed,
        'Failed pages': stats.failed,
        'Duration': `${stats.duration.toFixed(1)}s`,
        'Pages per second': stats.pagesPerSecond
      });
    });
    
    await scraper.start();
    
    log.success('Documentation scraping completed successfully!');
    log.info(`Markdown files have been saved to: ${structuredOutputDir}`);
    
  } catch (error) {
    log.error(`Error: ${error.message}`);
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
  log.info(`Analyzing dependencies in ${packageJsonPath}...`);
  
  try {
    // Normalize the path
    const normalizedPath = path.resolve(packageJsonPath);
    
    // Check if the file exists
    if (!await fs.pathExists(normalizedPath)) {
      log.error(`File not found: ${normalizedPath}`);
      return;
    }
    
    // Analyze dependencies
    const registryLookup = new LocalRegistryLookup();
    const dependencies = await registryLookup.analyzeDependencies(normalizedPath);
    
    log.info(`Found ${dependencies.length} dependencies in ${packageJsonPath}`);
    
    // Display dependencies in a simple format
    log.info('\nDependency Analysis:');
    log.info('-------------------');
    
    // Filter to found dependencies
    const foundDeps = dependencies.filter(dep => dep.found);
    
    // Display summary
    for (const dep of dependencies) {
      const status = dep.found ? '✅' : '❌';
      const confidence = dep.exactMatch ? 'EXACT' : (dep.found ? 'CLOSE' : 'N/A');
      log.info(`${status} ${dep.package}@${dep.version} - ${dep.found ? 'Documentation available' : 'No documentation found'} (${confidence})`);
    }
    
    log.info(`\nSummary: Found documentation for ${foundDeps.length} out of ${dependencies.length} dependencies.`);
    
    if (foundDeps.length === 0) {
      log.error('No documentation found for any dependencies.');
      return;
    }
    
    // Determine which dependencies to scrape
    let packagesToScrape = [];
    
    if (params.yes) {
      // Auto-scrape all dependencies with --yes flag
      packagesToScrape = foundDeps;
      log.info(`Auto-scraping documentation for ${packagesToScrape.length} packages...`);
    } else {
      // Ask which dependencies to scrape
      log.info('\nDo you want to scrape documentation for these packages? (all/none/comma-separated list)');
      const answer = await waitForInput();
      
      if (!answer || answer.toLowerCase() === 'none') {
        log.info('Scraping canceled.');
        return;
      }
      
      if (answer.toLowerCase() === 'all') {
        packagesToScrape = foundDeps;
      } else {
        // Parse comma-separated list
        const packageNames = answer.split(',').map(name => name.trim());
        packagesToScrape = foundDeps.filter(dep => packageNames.includes(dep.package));
      }
      
      log.info(`Scraping documentation for ${packagesToScrape.length} packages...`);
    }
    
    // Scrape selected dependencies
    let downloadedCount = 0;
    const startTime = Date.now();
    
    for (const dep of packagesToScrape) {
      log.info(`\n[${dep.package}] Fetching documentation...`);
      
      try {
        // Find documentation URL
        const docInfo = await registryLookup.findVersionDocUrl(dep.package, dep.version);
        
        if (!docInfo.found) {
          log.error(`[${dep.package}] Failed: No documentation found`);
          continue;
        }
        
        // Display info
        const confidence = docInfo.exactMatch ? 'EXACT' : 'CLOSE';
        const docVersion = docInfo.packageInfo?.latestVersion || dep.version;
        
        log.verbose(`[${dep.package}] Found documentation at: ${docInfo.url}`);
        log.verbose(`[${dep.package}] Version match: ${confidence}, Doc version: ${docVersion}`);
        log.info(`[${dep.package}] Downloading...`);
        
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
          concurrency: parseInt(params.concurrency || 10),
          retryCount: parseInt(params['retry-count'] || '3'),
          retryDelay: parseInt(params['retry-delay'] || '1000')
        };
        
        const scraper = new DocsToMarkdown(scrapeConfig);
        
        // Listen for progress events
        scraper.on('init', (data) => {
          log.verbose(`[${dep.package}] Initialized scraper, max pages: ${data.maxPages}`);
        });
        
        scraper.on('progress', (data) => {
          if (data.type === 'processing') {
            // Only log occasionally to reduce noise
            if (data.processed % 10 === 0 || data.processed === 1) {
              log.progress(`[${dep.package}] Processing page ${data.processed}/${data.maxPages || 'unlimited'}`, data.processed === 1);
            }
          } else if (data.type === 'saved') {
            // Only log major milestones
            if (data.progress % 25 === 0 || data.progress >= 95) {
              log.progress(`[${dep.package}] Saving progress: ${Math.floor(data.progress)}%`);
            }
          }
        });
        
        scraper.on('complete', (stats) => {
          downloadedCount++;
          log.success(`[${dep.package}] Downloaded ${stats.processed} pages in ${stats.duration.toFixed(1)}s`);
        });
        
        // Start scraping
        await scraper.start();
        
      } catch (error) {
        log.error(`[${dep.package}] Failed: ${error.message}`);
      }
    }
    
    // Display final summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    log.success(`Documentation check completed in ${duration}s`);
    log.summary('Results', {
      'Found': `${foundDeps.length}/${dependencies.length} packages`,
      'Downloaded': `${downloadedCount} package(s)`,
      'Duration': `${duration}s`
    });
  } catch (error) {
    log.error(`Error: ${error.message}`);
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
  compile [options]             Compile documentation into a single file

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
    
  Compile documentation:
    slurp compile --input ./slurps_docs --output ./compiled_docs.md

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
  
Compile Options:
  --input <dir>            Input directory (default: ./slurps_docs)
  --output <file>          Output file (default: ./compiled_docs.md)
  --preserve-metadata      Keep metadata in compiled output (default: true)
  --remove-navigation      Remove navigation elements (default: true)
  --remove-duplicates      Remove duplicate content (default: true)
  --exclude <json-array>   JSON array of regex patterns to exclude
  `);
}

// Run the script
main().catch(console.error);
