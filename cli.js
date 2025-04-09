#!/usr/bin/env node --no-warnings

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import chalk from 'chalk';
import { runSlurpWorkflow } from './src/slurpWorkflow.js';
import { MarkdownCompiler } from './src/MarkdownCompiler.js';

// Define __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure dotenv
dotenv.config({ path: path.resolve(__dirname, '.env') });

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
    const url = command;
    log.info(`Running Slurp workflow for URL: ${url}`);

    // Prepare options for the workflow function based on CLI params
    const workflowOptions = {
      // Pass relevant options parsed from 'params' object
      maxPages: params.max ? parseInt(params.max, 10) : undefined,
      useHeadless: params.headless !== 'false' ? undefined : false, // Only pass if explicitly false
      concurrency: params.concurrency ? parseInt(params.concurrency, 10) : undefined,
      retryCount: params['retry-count'] ? parseInt(params['retry-count'], 10) : undefined,
      retryDelay: params['retry-delay'] ? parseInt(params['retry-delay'], 10) : undefined,
      // Compilation options can also be passed if needed, or rely on env vars within the workflow
      // preserveMetadata: ...,
      // removeNavigation: ...,
      // removeDuplicates: ...,
      // deletePartials: ...,
      // Note: output paths are handled within runSlurpWorkflow based on env/defaults
    };

    try {
      const result = await runSlurpWorkflow(url, workflowOptions);
      if (result.success) {
        log.success(`Workflow completed. Compiled file: ${result.compiledFilePath}`);
      } else {
        // Error already logged within runSlurpWorkflow
        log.error('Slurp workflow failed.');
        // Optionally set a non-zero exit code
        process.exitCode = 1;
      }
    } catch (error) {
      // Catch any unexpected errors from the workflow function itself
      log.error(`Unexpected error during Slurp workflow: ${error.message}`);
      if (error.stack) {
          log.verbose(error.stack);
      }
      process.exitCode = 1;
    }
    return; // Exit after handling the direct URL case
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
        // Use runSlurpWorkflow instead of scrapeFromUrl
        const fetchOptions = {
          version: fetchVersion
        };
        await runSlurpWorkflow(fetchArg, fetchOptions);
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
        // Use runSlurpWorkflow instead of scrapeFromUrl
        await runSlurpWorkflow(params.url, { 
          library: params.library,
          version: params.version
        });
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
