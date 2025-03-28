const LocalRegistryLookup = require('./src/LocalRegistryLookup');
const DocsToMarkdown = require('./src/DocsToMarkdown');
const DocSlurper = require('./src/DocSlurper');
const path = require('path');
const fs = require('fs-extra');

/**
 * SlurpAI - Documentation scraper for AI systems
 * Finds package documentation by name and version, then scrapes it into a structured format
 */

// Simple command line argument parsing
const args = process.argv.slice(2);
const params = {};

// Parse command line arguments
for (let i = 0; i < args.length; i++) {
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
  
  // Various modes of operation
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

/**
 * Scrape documentation for a specific package and version
 * @param {string} packageName - Name of the package
 * @param {string} version - Version of the package (optional)
 */
async function scrapePackageDocumentation(packageName, version) {
  console.log(`Finding documentation for ${packageName}${version ? `@${version}` : ''}...`);
  
  try {
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
      outputDir: params.output || path.join(__dirname, 'docs'),
      maxPages: parseInt(params.max || '20', 10),
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
    // Configure the scraper
    const scrapeConfig = {
      baseUrl: url,
      outputDir: params.output || path.join(__dirname, 'docs'),
      maxPages: parseInt(params.max || '20', 10),
      useHeadless: params.headless !== 'false',
      
      // Set library information if provided
      libraryInfo: {
        library: library || '',
        version: version || '',
        exactVersionMatch: false
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
      allowedDomains: [new URL(url).hostname],
      
      // Async queue options
      concurrency: parseInt(params.concurrency || '5', 10),
      retryCount: parseInt(params['retry-count'] || '3', 10),
      retryDelay: parseInt(params['retry-delay'] || '1000', 10)
    };
    
    const scraper = new DocsToMarkdown(scrapeConfig);
    await scraper.start();
    
    console.log('\n✅ Documentation scraping completed successfully!');
    
    // Determine the output directory based on provided library/version info
    let outputPath = scrapeConfig.outputDir;
    if (library) {
      outputPath = path.join(outputPath, library);
      if (version) {
        outputPath = path.join(outputPath, version);
      }
    }
    
    console.log(`Markdown files have been saved to: ${outputPath}`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
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
    
    console.log(`\nFound ${dependencies.length} dependencies:`);
    
    // Display table header
    console.log('\n| Package | Version | Documentation URL | Found |');
    console.log('|---------|---------|-------------------|-------|');
    
    // Display table rows
    for (const dep of dependencies) {
      const status = dep.found ? '✅' : '❌';
      console.log(`| ${dep.package} | ${dep.version} | ${dep.url || 'N/A'} | ${status} |`);
    }
    
    // Filter to found dependencies
    const foundDeps = dependencies.filter(dep => dep.found);
    
    if (foundDeps.length === 0) {
      console.log('\n❌ No documentation found for any dependencies.');
      return;
    }
    
    console.log(`\nFound documentation for ${foundDeps.length} out of ${dependencies.length} dependencies.`);
    
    // Ask which dependencies to scrape
    if (!params.yes) {
      console.log('\nDo you want to scrape documentation for these packages? (all/none/comma-separated list)');
      const answer = await waitForInput();
      
      if (!answer || answer.toLowerCase() === 'none') {
        console.log('Scraping canceled.');
        return;
      }
      
      let packagesToScrape = [];
      
      if (answer.toLowerCase() === 'all') {
        packagesToScrape = foundDeps;
      } else {
        // Parse comma-separated list
        const packageNames = answer.split(',').map(name => name.trim());
        packagesToScrape = foundDeps.filter(dep => packageNames.includes(dep.package));
      }
      
      // Scrape selected dependencies
      for (const dep of packagesToScrape) {
        await scrapePackageDocumentation(dep.package, dep.version);
      }
    } else {
      // Auto-scrape all dependencies with --yes flag
      for (const dep of foundDeps) {
        await scrapePackageDocumentation(dep.package, dep.version);
      }
    }
    
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
  node slurp.js --package <package-name> [--version <version>] [options]
  node slurp.js --url <documentation-url> [--library <name>] [--version <version>] [options]
  node slurp.js --package-json <path-to-package.json> [options]

Examples:
  Scrape by package name:
    node slurp.js --package express --version 4.18.2

  Scrape by URL:
    node slurp.js --url https://reactjs.org/docs/getting-started.html --library react --version 18.2.0

  Analyze package.json:
    node slurp.js --package-json ./package.json

Options:
  --package <name>         Specify package name to scrape
  --version <version>      Specify package version
  --url <url>              Specify documentation URL to scrape
  --library <name>         Library name (when using URL mode)
  --package-json <path>    Path to package.json for dependency analysis
  --output <dir>           Output directory (default: ./docs)
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
