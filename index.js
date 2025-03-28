const DocsToMarkdown = require('./src/DocsToMarkdown');
const path = require('path');

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

// Set default values
const baseUrl = params.url || 'https://flask.palletsprojects.com/en/stable/';
const outputDir = params.output || path.join(__dirname, 'docs');
const maxPages = parseInt(params.max || '0', 10);
const useHeadless = params.headless !== 'false';

// Library and version info
const library = params.library || '';
const version = params.version || '';
const exactVersionMatch = params['exact-match'] === 'true';

// Concurrency settings
const concurrency = parseInt(params.concurrency || '5', 10);
const retryCount = parseInt(params['retry-count'] || '3', 10);
const retryDelay = parseInt(params['retry-delay'] || '1000', 10);

// Configuration for documentation scraping
const config = {
  baseUrl,
  outputDir,
  maxPages,
  useHeadless,
  
  // Library information
  libraryInfo: {
    library,
    version,
    exactVersionMatch
  },
  
  // Content selector based on documentation site
  // Default to common content selectors
  contentSelector: '.document', // Main content area for Flask docs
  excludeSelectors: [
    '.headerlink',       // Remove header links
    'script',            // Remove scripts
    'style',             // Remove styles
    '.sidebar',          // Remove sidebar
    '.related',          // Remove navigation
    '.footer'            // Remove footer
  ],
  
  // Domain restrictions
  allowedDomains: [new URL(baseUrl).hostname],
  
  // Async queue options
  concurrency,
  retryCount,
  retryDelay
};

// Display configuration
console.log('Starting documentation scraper with configuration:');
console.log(JSON.stringify(config, null, 2));

async function main() {
  try {
    // Create and start the scraper
    const scraper = new DocsToMarkdown(config);
    
    // Add library metadata to the save process
    scraper.saveMarkdown = async function(url, markdown) {
      const options = this.config.libraryInfo || {};
      
      // Use our helper method for consistent filename generation
      const filename = this.getFilenameForUrl(url);
      
      // Build the output directory path based on library and version info
      let outputDir = this.outputDir;
      
      if (options.library) {
        outputDir = path.join(outputDir, options.library);
        
        if (options.version) {
          outputDir = path.join(outputDir, options.version);
        }
      }
      
      // Ensure the directory exists
      await fs.ensureDir(outputDir);
      
      // Add metadata
      const content = `---
url: ${url}
scrapeDate: ${new Date().toISOString()}
${options.library ? `library: ${options.library}` : ''}
${options.version ? `version: ${options.version}` : ''}
${options.exactVersionMatch !== undefined ? `exactVersionMatch: ${options.exactVersionMatch}` : ''}
---

${markdown}`;
      
      const outputPath = path.join(outputDir, filename);
      await fs.writeFile(outputPath, content);
      console.log(`Saved ${url} to ${outputPath}`);
    };
    
    await scraper.start();
    
    console.log('Documentation scraping completed successfully!');
    console.log(`Markdown files have been saved to: ${outputDir}`);
  } catch (error) {
    console.error('Error during scraping:', error);
    process.exit(1);
  }
}

// Run the scraper
main();

/* 
Usage examples:

Basic usage:
node index.js

Custom URL:
node index.js --url https://example.com

Limit number of pages:
node index.js --max 10

Custom output directory:
node index.js --output ./my-docs

Library and version information:
node index.js --library flask --version 2.0.1 --exact-match true

Set concurrency:
node index.js --concurrency 10

Without headless browser:
node index.js --headless false

Full example with all options:
node index.js --url https://docs.python.org/3/ --output ./python-docs --library python --version 3.10 --max 100 --concurrency 5 --retry-count 3 --retry-delay 2000
*/
