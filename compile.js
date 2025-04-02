#!/usr/bin/env node

const { MarkdownCompiler } = require('./src/MarkdownCompiler');
const path = require('path');
const fs = require('fs-extra');
require('dotenv').config();

/**
 * Parse command line arguments
 * @returns {Object} Parsed options
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    basePath: null,
    inputDir: null,
    outputFile: null,
    preserveMetadata: true,
    removeNavigation: true,
    removeDuplicates: true,
    excludePatterns: null,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }
    
    if (arg === '--base-path' || arg === '-b') {
      options.basePath = args[++i];
      continue;
    }
    
    if (arg === '--input' || arg === '-i') {
      options.inputDir = args[++i];
      continue;
    }
    
    if (arg === '--output' || arg === '-o') {
      options.outputFile = args[++i];
      continue;
    }
    
    if (arg === '--preserve-metadata') {
      options.preserveMetadata = args[++i] !== 'false';
      continue;
    }
    
    if (arg === '--remove-navigation') {
      options.removeNavigation = args[++i] !== 'false';
      continue;
    }
    
    if (arg === '--remove-duplicates') {
      options.removeDuplicates = args[++i] !== 'false';
      continue;
    }
    
    if (arg === '--exclude') {
      try {
        options.excludePatterns = JSON.parse(args[++i]).map(pattern => new RegExp(pattern, 'gi'));
      } catch (error) {
        console.error('Error parsing exclude patterns:', error.message);
        process.exit(1);
      }
      continue;
    }
  }
  
  return options;
}

/**
 * Display help information
 */
function showHelp() {
  console.log(`
SlurpAI Documentation Compiler

Usage: node compile.js [options]

Options:
  --help, -h                 Show this help message
  --base-path, -b <path>     Base path for all operations (default: current directory or SLURP_BASE_PATH)
  --input, -i <dir>          Input directory (default: ./slurps_docs or SLURP_INPUT_DIR)
                              Can be any directory containing markdown files - will be processed recursively
  --output, -o <file>        Output file (default: ./compiled_docs.md or SLURP_OUTPUT_FILE)
  --preserve-metadata <bool> Whether to preserve metadata (default: true or SLURP_PRESERVE_METADATA)
  --remove-navigation <bool> Whether to remove navigation links (default: true or SLURP_REMOVE_NAVIGATION)
  --remove-duplicates <bool> Whether to remove duplicate content (default: true or SLURP_REMOVE_DUPLICATES)
  --exclude <json>           JSON array of regex patterns to exclude
                              Example: --exclude '["Was this helpful\\?", "On this page"]'

Environment Variables:
  SLURP_BASE_PATH            Base path for all operations
  SLURP_INPUT_DIR            Input directory for markdown files
  SLURP_OUTPUT_FILE          Output file for compiled docs
  SLURP_PRESERVE_METADATA    Whether to preserve metadata (true/false)
  SLURP_REMOVE_NAVIGATION    Whether to remove navigation elements (true/false)
  SLURP_REMOVE_DUPLICATES    Whether to remove duplicate content (true/false)

Examples:
  # Basic usage with default options
  node compile.js

  # Custom input/output paths
  node compile.js --input ./my-docs --output ./compiled.md

  # Compile a specific folder (works with any folder structure)
  node compile.js --input ./slurps_docs/modelcontextprotocol/docs --output ./mcp.md

  # Using base path
  node compile.js --base-path ~/projects/docs --input docs --output compiled.md

  # Disable metadata preservation
  node compile.js --preserve-metadata false

  # Custom exclude patterns
  node compile.js --exclude '["Was this helpful\\?", "On this page"]'
`);
}

/**
 * Main function
 */
async function main() {
  const options = parseArgs();
  
  if (options.help) {
    showHelp();
    return;
  }
  
  try {
    console.log('Starting documentation compilation...');
    
    // Create compiler instance with options
    const compiler = new MarkdownCompiler({
      basePath: options.basePath,
      inputDir: options.inputDir,
      outputFile: options.outputFile,
      preserveMetadata: options.preserveMetadata,
      removeNavigation: options.removeNavigation,
      removeDuplicates: options.removeDuplicates,
      excludePatterns: options.excludePatterns
    });
    
    // Run compilation
    const result = await compiler.compile();
    
    // Display results
    console.log('\nCompilation complete!');
    console.log(`Output file: ${result.outputFile}`);
    console.log('\nStatistics:');
    console.log(`- Total files found: ${result.stats.totalFiles}`);
    console.log(`- Files processed: ${result.stats.processedFiles}`);
    console.log(`- Files skipped: ${result.stats.skippedFiles}`);
    console.log(`- Duplicates removed: ${result.stats.duplicatesRemoved}`);
    
    // Check if any files were processed
    if (result.stats.processedFiles === 0) {
      console.log('\nNo files were processed. This could be because:');
      console.log('- The input directory is empty');
      console.log('- No markdown files were found');
      console.log('- All files were filtered out as duplicates');
      console.log('\nCheck your input directory and try again.');
    } else {
      console.log(`\nSuccessfully compiled ${result.stats.processedFiles} files into ${result.outputFile}`);
    }
  } catch (error) {
    console.error('Error during compilation:', error.message);
    process.exit(1);
  }
}

// Run the main function
main().catch(console.error);
