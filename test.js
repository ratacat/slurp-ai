const DocScraper = require('./src/DocScraper');
const path = require('path');

// Test configuration with a small page limit
const testConfig = {
  baseUrl: 'https://flask.palletsprojects.com/en/stable/',
  outputDir: path.join(__dirname, 'test-docs'),
  maxPages: 5, // Limit to 5 pages for quick testing
  useHeadless: true,
  contentSelector: '.document',
  excludeSelectors: [
    '.headerlink',
    'script',
    'style',
    '.sidebar',
    '.related',
    '.footer'
  ],
  allowedDomains: ['flask.palletsprojects.com'],
  concurrency: 3,
  retryCount: 2,
  retryDelay: 1000
};

async function runTest() {
  console.log('Running test with configuration:');
  console.log(JSON.stringify(testConfig, null, 2));
  
  try {
    const scraper = new DocScraper(testConfig);
    await scraper.start();
    
    console.log('Test completed successfully!');
    console.log(`Check the test-docs directory for the output.`);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
runTest();