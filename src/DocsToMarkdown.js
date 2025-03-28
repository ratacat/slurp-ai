const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const TurndownService = require('turndown');
const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');
const PQueue = require('p-queue').default;

/**
 * DocsToMarkdown - A class to scrape documentation sites and convert to markdown
 */
class DocsToMarkdown {
  /**
   * Create a new DocScraper
   * @param {Object} options - Configuration options
   * @param {string} options.baseUrl - The base URL of the documentation site
   * @param {string} options.outputDir - Directory to save markdown files
   * @param {string[]} options.allowedDomains - Domains that are allowed to be scraped (defaults to domain of baseUrl)
   * @param {number} options.maxPages - Maximum number of pages to scrape (0 for unlimited)
   * @param {boolean} options.useHeadless - Whether to use headless browser for JavaScript-rendered content
   * @param {string} options.contentSelector - CSS selector for the main content area
   * @param {string[]} options.excludeSelectors - CSS selectors to exclude from content
   * @param {number} options.concurrency - Number of pages to process concurrently (default: 5)
   * @param {number} options.retryCount - Number of times to retry failed requests (default: 3)
   * @param {number} options.retryDelay - Delay between retries in ms (default: 1000)
   */
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.outputDir = options.outputDir || './docs';
    this.visitedUrls = new Set(); // Fully processed URLs
    this.queuedUrls = new Set(); // URLs in the queue
    this.inProgressUrls = new Set(); // URLs currently being processed
    this.baseUrlObj = new URL(options.baseUrl);
    this.allowedDomains = options.allowedDomains || [this.baseUrlObj.hostname];
    this.maxPages = options.maxPages || 0;
    this.useHeadless = options.useHeadless !== false;
    this.contentSelector = options.contentSelector || 'body';
    this.excludeSelectors = options.excludeSelectors || [];
    
    // Concurrency settings
    this.concurrency = options.concurrency || 5;
    this.retryCount = options.retryCount || 3;
    this.retryDelay = options.retryDelay || 1000;
    
    // Initialize PQueue for concurrent processing
    this.queue = new PQueue({
      concurrency: this.concurrency,
      autoStart: true
    });
    
    // Set up the markdown converter
    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced'
    });
    
    // Configure Turndown for better markdown conversion
    this.configureTurndown();
    
    // Stats
    this.stats = {
      processed: 0,
      failed: 0,
      startTime: null,
      endTime: null
    };
  }

  /**
   * Generate a consistent filename for a given URL
   * @param {string} url - The URL to convert to a filename
   * @returns {string} The filename with .md extension
   */
  getFilenameForUrl(url) {
    const urlObj = new URL(url);
    let filename = urlObj.pathname.replace(/\//g, '_');
    
    // Handle base URL case
    if (filename === '' || filename === '_') {
      filename = 'index';
    }
    
    // Add .md extension if needed
    if (!filename.endsWith('.md')) {
      filename += '.md';
    }
    
    return filename;
  }

  /**
   * Configure the Turndown service with custom rules
   */
  configureTurndown() {
    // Preserve code blocks
    this.turndownService.addRule('codeBlocks', {
      filter: ['pre'],
      replacement: function(content, node) {
        const language = node.querySelector('code') ? 
          node.querySelector('code').className.replace('language-', '') : '';
        return `\n\`\`\`${language}\n${content}\n\`\`\`\n`;
      }
    });

    // Handle tables better
    this.turndownService.addRule('tables', {
      filter: ['table'],
      replacement: function(content) {
        // Simple table handling - could be improved
        return '\n\n' + content + '\n\n';
      }
    });
    
    // Custom rule for internal links
    const self = this;
    this.turndownService.addRule('internalLinks', {
      filter: (node, options) => {
        return node.nodeName === 'A' && node.getAttribute('href');
      },
      replacement: function(content, node, options) {
        const href = node.getAttribute('href');
        
        // Skip empty links, anchor links, or javascript
        if (!href || href.startsWith('javascript:')) {
          return content;
        }
        
        try {
          // Resolve relative URL
          const url = new URL(href, self.baseUrl);
          
          // Handle anchor links in the same page
          if (href.startsWith('#')) {
            return `[${content}](${href})`;
          }
          
          // If it's an internal link (same allowed domains)
          if (self.allowedDomains.includes(url.hostname)) {
            // Store the hash part
            const hash = url.hash;
            
            // Remove hash part temporarily
            url.hash = '';
            
            // Handle relative links consistently by always using
            // the full URL path pattern from base URL
            let fullUrl;
            
            // If URL is relative (no protocol/hostname), resolve it against base URL
            if (!url.protocol || url.hostname === '') {
              // We need to resolve relative paths consistently
              const baseUrlPath = new URL(self.baseUrl).pathname;
              
              // If href is a relative path (not starting with /)
              if (href.startsWith('.') || (!href.startsWith('/') && !href.startsWith('http'))) {
                // Get directory part of current URL
                const currentPath = new URL(node.baseURI || self.baseUrl).pathname;
                const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                
                // Join with relative path, create full URL
                const resolvedPath = new URL(href, new URL(currentDir, self.baseUrl)).pathname;
                fullUrl = new URL(resolvedPath, self.baseUrl).toString();
              } else {
                // For absolute paths starting with / or full URLs
                fullUrl = new URL(url.toString(), self.baseUrl).toString();
              }
            } else {
              // Full URL already
              fullUrl = url.toString();
            }
            
            // Generate the expected filename for this URL
            const targetFilename = self.getFilenameForUrl(fullUrl);
            
            // Return markdown link with correct filename (add back hash if existed)
            return `[${content}](${targetFilename}${hash})`;
          } else {
            // External link - keep as is
            return `[${content}](${href})`;
          }
        } catch (error) {
          console.error(`Error processing link ${href}:`, error.message);
          return `[${content}](${href})`;
        }
      }
    });
    
    // Handle images better
    this.turndownService.addRule('images', {
      filter: 'img',
      replacement: function(content, node) {
        const alt = node.getAttribute('alt') || '';
        let src = node.getAttribute('src') || '';
        
        // For now, keep image paths as-is
        // Could be enhanced later to download images
        
        return `![${alt}](${src})`;
      }
    });
  }

  /**
   * Get the total number of pages in all states (visited, in progress, queued)
   * @returns {number} Total pages count
   */
  getTotalPageCount() {
    return this.visitedUrls.size + this.inProgressUrls.size + this.queuedUrls.size;
  }

  /**
   * Check if we've reached the maximum number of pages
   * @returns {boolean} True if the maximum has been reached
   */
  hasReachedMaxPages() {
    return this.maxPages > 0 && this.getTotalPageCount() >= this.maxPages;
  }

  /**
   * Start the scraping process
   */
  async start() {
    this.stats.startTime = new Date();
    console.log(`Starting scrape of ${this.baseUrl} with concurrency ${this.concurrency}`);
    
    // Ensure output directory exists
    await fs.ensureDir(this.outputDir);
    
    // Initialize browser if using headless mode
    let browser = null;
    if (this.useHeadless) {
      browser = await puppeteer.launch({ headless: 'new' });
    }
    
    // Add the first URL to the queue
    this.addToQueue(this.baseUrl, browser);
    
    // Wait for the queue to empty
    await this.queue.onIdle();
    
    // Clean up
    if (browser) {
      await browser.close();
    }
    
    this.stats.endTime = new Date();
    const duration = (this.stats.endTime - this.stats.startTime) / 1000;
    
    console.log(`Scraping complete in ${duration.toFixed(2)} seconds.`);
    console.log(`Processed: ${this.stats.processed} pages`);
    console.log(`Failed: ${this.stats.failed} pages`);
    console.log(`Pages per second: ${(this.stats.processed / duration).toFixed(2)}`);
  }

  /**
   * Add a URL to the processing queue
   * @param {string} url - The URL to process
   * @param {Browser} browser - Puppeteer browser instance
   * @returns {boolean} Whether the URL was added to the queue
   */
  addToQueue(url, browser) {
    // Skip if already visited, in progress, or queued
    if (this.visitedUrls.has(url) || this.inProgressUrls.has(url) || this.queuedUrls.has(url)) {
      return false;
    }
    
    // Check if we've reached max pages
    if (this.hasReachedMaxPages()) {
      // Only log this message for the first URL we reject
      if (this.getTotalPageCount() === this.maxPages) {
        //console.log(`Reached maximum of ${this.maxPages} pages, not adding more to queue.`);
      }
      return false;
    }
    
    // Mark as queued to avoid adding it multiple times
    this.queuedUrls.add(url);
    
    // Add the processing task to the queue
    this.queue.add(async () => {
      try {
        // Remove from queued and mark as in progress
        this.queuedUrls.delete(url);
        this.inProgressUrls.add(url);
        
        console.log(`Processing ${url} (${this.visitedUrls.size}/${this.maxPages || 'unlimited'}) - Queue size: ${this.queue.size}`);
        
        // Fetch the page content
        let html;
        if (this.useHeadless) {
          const page = await browser.newPage();
          await page.setDefaultNavigationTimeout(30000);
          await page.goto(url, { waitUntil: 'networkidle2' });
          html = await page.content();
          await page.close();
        } else {
          const response = await axios.get(url, {
            timeout: 30000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          });
          html = response.data;
        }
        
        // Process the page content
        const $ = cheerio.load(html);
        
        // Extract new links before we process this page
        const newUrls = this.extractLinks($, url);
        
        // Only add new URLs if we haven't reached the max
        if (!this.hasReachedMaxPages()) {
          for (const newUrl of newUrls) {
            this.addToQueue(newUrl, browser);
          }
        }
        
        // Process and save the page content
        await this.processPage(url, $);
        
        // Mark as visited and update stats
        this.visitedUrls.add(url);
        this.stats.processed++;
        
      } catch (error) {
        console.error(`Error processing ${url}:`, error.message);
        this.stats.failed++;
      } finally {
        // Remove from in progress
        this.inProgressUrls.delete(url);
      }
    });
    
    return true;
  }

  /**
   * Process a page - extract content and convert to markdown
   * @param {string} url - The URL of the page 
   * @param {CheerioStatic} $ - Cheerio instance with loaded HTML
   */
  async processPage(url, $) {
    // Extract the main content
    let content = $(this.contentSelector);
    
    // Remove elements that shouldn't be included
    for (const selector of this.excludeSelectors) {
      $(selector, content).remove();
    }
    
    // Convert to markdown
    const markdown = this.turndownService.turndown(content.html() || '');
    
    // Save the file
    await this.saveMarkdown(url, markdown);
  }

  /**
   * Extract links from the page for further crawling
   * @param {CheerioStatic} $ - Cheerio instance
   * @param {string} baseUrl - Base URL for resolving relative links
   * @returns {string[]} Array of new URLs to process
   */
  extractLinks($, baseUrl) {
    const newUrls = [];
    const links = $('a[href]');
    
    links.each((i, el) => {
      let href = $(el).attr('href');
      
      // Skip empty, anchor or javascript links
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
        return;
      }
      
      // Resolve relative URLs
      try {
        const url = new URL(href, baseUrl);
        
        // Only process links from allowed domains
        if (!this.allowedDomains.includes(url.hostname)) {
          return;
        }
        
        // Remove hash part (fragment)
        url.hash = '';
        const normalizedUrl = url.toString();
        
        // Add to new URLs if not already tracked
        if (!this.visitedUrls.has(normalizedUrl) && 
            !this.inProgressUrls.has(normalizedUrl) && 
            !this.queuedUrls.has(normalizedUrl)) {
          newUrls.push(normalizedUrl);
        }
      } catch (error) {
        console.error(`Error processing link ${href}:`, error.message);
      }
    });
    
    return newUrls;
  }

  /**
   * Save markdown content to file
   * @param {string} url - The URL of the page
   * @param {string} markdown - The markdown content
   * @param {Object} options - Additional options
   * @param {string} options.library - Name of the library (e.g., 'flask')
   * @param {string} options.version - Version of the library (e.g., '2.0.1')
   * @param {boolean} options.exactVersionMatch - Whether the version is an exact match
   */
  async saveMarkdown(url, markdown, options = {}) {
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
  }
}

module.exports = DocsToMarkdown;
