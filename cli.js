#!/usr/bin/env node --no-warnings

const path = require('path');
// Explicitly load .env from the script's directory
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const DocumentationScraper = require('./src/DocumentationScraper');
const { MarkdownCompiler } = require('./src/MarkdownCompiler');
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
if (['read', 'fetch'].includes(command)) { // Removed 'purge'
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
  // Check for direct URL mode first (before entering the switch)
  if (command && isUrl(command)) {
    // This is the new 'slurp <url>' command that combines fetch and compile in one step
    // First, scrape the URL (equivalent to slurp fetch <url>), then compile the results
    const url = command;
    
    // Set a special flag for direct URL mode to control output
    const directUrlMode = true;
    
    // Suppress all output initially
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    // Override console methods to hide warnings and verbose output
    console.log = function() {
      // Only log if it's an error or specific important messages
      if (arguments[0] && typeof arguments[0] === 'string' &&
          (arguments[0].includes('Error') || arguments[0].includes('Failed'))) {
        // In direct URL mode, don't automatically show "Failed: 0 pages"
        if (directUrlMode && arguments[0].includes('Failed: 0 pages')) {
          return; // Skip this message in direct URL mode
        }
        originalConsoleLog.apply(console, arguments);
      }
    };
    console.error = function() { originalConsoleError.apply(console, arguments); };
    console.warn = function() {};
    
    // Also suppress process warnings
    process.env.NODE_NO_WARNINGS = '1';
    
    const result = await scrapeFromUrl(url, null, null);
    
    // Restore original console methods
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    
    // Check if the scraping was successful
    if (!result || !result.success) {
      log.error('Failed to fetch documentation. Skipping compile step.');
      return;
    }
    
    // Now run the compile step (equivalent to slurp compile)
    // Extract a descriptive name from the URL for the output filename
    
    // Determine a proper name for the library based on the URL
    // The hostname should look like "reactjs.org" for reactjs
    const urlObj = new URL(url);
    let siteName = '';
    
    // Get domain name without TLD
    const domainMatch = urlObj.hostname.match(/([^.]+)\.[^.]+$/);
    if (domainMatch && domainMatch[1]) {
      siteName = domainMatch[1];
    } else {
      // Fallback to first part of hostname
      siteName = urlObj.hostname.split('.')[0];
    }
    
    // Try to get a meaningful name, with fallbacks
    const outputName = siteName || '';
    const outputFilename = `${outputName}_docs.md`;

    // Use 'compiled' as the standard output directory, configurable via .env
    // Use SLURP_COMPILED_DIR for the final output directory, defaulting to 'compiled'
    const outputDir = process.env.SLURP_COMPILED_DIR || 'compiled';
    const finalOutputPath = path.join(outputDir, outputFilename);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Use 'compiled' as the standard output directory, but allow it to be configurable via .env
    // Define compile options first
    
    // Extract the input directory name to use as part of the output filename
    // This ensures we maintain the domain name in the output file
    const directCompileOptions = {
      inputDir: result.outputDir,
      // Force the output filename to be based on the domain name,
      // not relying on env variables which might override it
      outputFile: finalOutputPath, // Use the pre-calculated final path
      // Also set output name directly to override any defaults
      outputName: outputName,
      preserveMetadata: process.env.SLURP_PRESERVE_METADATA !== 'false',
      removeNavigation: process.env.SLURP_REMOVE_NAVIGATION !== 'false',
      removeDuplicates: process.env.SLURP_REMOVE_DUPLICATES !== 'false'
    };

    try {
      // We've already ensured the output directory exists above
      
      // Create compiler instance
      const compiler = new MarkdownCompiler(directCompileOptions);
      
      // Run compilation
      const compileResult = await compiler.compile();
      
      // Display minimal results
      log.info(`Compiled to ${path.relative(process.cwd(), compileResult.outputFile)}`);

      // Cleanup partials if enabled
      const deletePartials = process.env.SLURP_DELETE_PARTIALS !== 'false'; // Default true
      if (deletePartials && compileResult.stats.processedFiles > 0) {
        log.verbose(`Deleting partials directory: ${directCompileOptions.inputDir}`);
        await fs.remove(directCompileOptions.inputDir);
        log.verbose(`Partials directory deleted.`);
      }

    } catch (error) {
      log.error(`Error during compilation: ${error.message}`);
      console.error(error.stack); // Show stack trace for compile errors too
    }
    return;
  }
  
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
        // Package name provided, but package fetching via DocSlurper is removed.
        log.error('Fetching documentation by package name is disabled.');
        log.info('Please provide a direct URL using `slurp <url>` or `slurp fetch <url>`.');
        log.info('Please provide a direct URL instead: slurp <url>');
      }
      break;
      
    case 'compile':
      // Compile documentation: slurp compile [options]
      log.info('Compiling documentation...');
      
      // Parse compile-specific options
      const compileOptions = {
        basePath: params['base-path'],
        // Default input is now slurp_partials
        inputDir: params.input || process.env.SLURP_PARTIALS_DIR, // Let MarkdownCompiler handle default if null
        // Default output is now slurp_compiled/compiled_docs.md
        outputFile: params.output, // Pass CLI flag value; let MarkdownCompiler handle default if null/undefined
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
        log.info(`Output file: ${path.relative(process.cwd(), result.outputFile)}`);
        
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
          log.success(`Successfully compiled ${result.stats.processedFiles} files into ${path.relative(process.cwd(), result.outputFile)}`);

          // Cleanup partials if enabled
          const deletePartials = process.env.SLURP_DELETE_PARTIALS !== 'false'; // Default true
          const finalInputDir = compiler.inputDir; // Get the actual input dir used by compiler
          if (deletePartials && result.stats.processedFiles > 0) {
             log.verbose(`Deleting partials directory: ${finalInputDir}`);
             await fs.remove(finalInputDir);
             log.verbose(`Partials directory deleted.`);
          }
        }
      } catch (error) {
        log.error(`Error during compilation: ${error.message}`);
      }
      break;
      
    // Legacy support for original parameter style
    default:
      // Handle legacy --url flag
      if (params.url) {
        await scrapeFromUrl(params.url, params.library, params.version);
      } else { // If no recognized command or legacy flag, show help
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
 * @param {string} library - Name of the library (optional)
 * @param {string} version - Version of the library (optional)
 * @returns {Object} Result object with success status and outputDir
 * Scrape documentation from a specific URL
 * @param {string} url - URL to scrape
 * @param {string} library - Library name (optional)
 * @param {string} version - Version (optional)
 */
async function scrapeFromUrl(url, library, version) {
  try {
    // Generate library name from URL if not provided
    const urlObj = new URL(url);
    const generatedLibrary = library || extractNameFromUrl(url);
    
    // Create a better directory structure based on the URL path
    const pathSegments = urlObj.pathname.split('/').filter(Boolean);
    const siteName = urlObj.hostname.split('.')[0]; // e.g., "modelcontextprotocol" from "modelcontextprotocol.io"
    
    // Base output directory
    const baseOutputDir = params.output || process.env.SLURP_PARTIALS_DIR || path.join(__dirname, 'slurp_partials');
    
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
      maxPages: parseInt(params.max || process.env.SLURP_MAX_PAGES_PER_SITE || '20', 10),
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
      concurrency: parseInt(params.concurrency || process.env.SLURP_CONCURRENCY || '10', 10),
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
    
    const scraper = new DocumentationScraper(scrapeConfig);
    
    // Set up minimal logging
    let processed = 0;
    let failedPages = 0;
    
    // One-line progress reporting with minimal output
    scraper.on('init', () => {});
    
    // Only show one line of output periodically
    scraper.on('progress', (data) => {
      if (data.type === 'processing') {
        processed++;
        // Update the count on the same line for every document
        process.stdout.write(`\rProcessing documents: ${processed}`);
      } else if (data.type === 'failed') {
        failedPages++;
      }
    });
    
    // Create a variable to store the stats for later use
    let scrapingStats = null;

    scraper.on('complete', (stats) => {
      // Store stats for later without displaying them yet
      scrapingStats = stats;
      
      // Add a newline after processing is complete
      process.stdout.write('\n');
      
      // Only display failure info if there were failures
      if (stats.failed > 0) {
        process.stdout.write(`Failed: ${stats.failed} pages\n`);
      }
    });
    
    await scraper.start();
    
    // Return success result information for chaining
    return {
      success: true,
      outputDir: structuredOutputDir,
      libraryName: generatedLibrary
    };
    
    
  } catch (error) {
    log.error(`Error: ${error.message}`);
    console.error(error.stack); // Always show stack trace for debugging
    // Return failure information
    return {
      success: false
    };
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
  <url>                         Fetch and compile documentation in one step
  read <package> [version]      Read local documentation
  fetch <url> [version]         Download documentation from a URL
  compile [options]             Compile downloaded documentation into a single file

Examples:
  Direct URL mode (fetch and compile):
    slurp https://modelcontextprotocol.io/introduction

  Read local documentation:
    slurp read express 4.18.2


  Find and download documentation (URL):
    slurp fetch https://modelcontextprotocol.io/introduction


    slurp purge express 4.18.2
    
  Compile documentation:
    slurp compile --input ./slurps_docs --output ./compiled_docs.md

Legacy Usage (still supported):
  slurp --url <documentation-url> [--library <name>] [--version <version>] [options] # Legacy

Options:
  --output <dir>           Output directory for partial files (default: ./slurp_partials or SLURP_OUTPUT_DIR)
  --max <number>           Maximum pages to scrape (default: 20)
  --headless <boolean>     Use headless browser (default: true)
  --concurrency <number>   Number of concurrent pages (default: 5)
  --retry-count <number>   Number of retries for failed requests (default: 3)
  --retry-delay <number>   Delay between retries in ms (default: 1000)
  --yes                    Skip confirmation prompts
  
Compile Options:
  --input <dir>            Input directory for compiler (default: ./slurp_partials or SLURP_INPUT_DIR)
  --output <file>          Output file for compiler (default: ./slurp_compiled/compiled_docs.md)
  --preserve-metadata      Keep metadata in compiled output (default: true or SLURP_PRESERVE_METADATA)
  --remove-navigation      Remove navigation elements (default: true or SLURP_REMOVE_NAVIGATION)
  --remove-duplicates      Remove duplicate content (default: true or SLURP_REMOVE_DUPLICATES)
  --exclude <json-array>   JSON array of regex patterns to exclude (CLI only)
  `); // Removed BRAVE_*, SLURP_SIMILARITY_THRESHOLD, SLURP_SORT_BY, SLURP_*_LIBRARIES, SLURP_GENERATE_TOC, SLURP_COMPILED_DIR, SLURP_OUTPUT_FILE env vars
}

// Run the script
main().catch(console.error);
