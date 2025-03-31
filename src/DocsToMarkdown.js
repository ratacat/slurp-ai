const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const TurndownService = require('turndown');
const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');
const EventEmitter = require('events');
const { extract } = require('@extractus/article-extractor');
require('dotenv').config();
// Import p-queue using a different approach to avoid ES Module warning
// This is a workaround for the CommonJS/ES Module compatibility issue
let PQueue;
try {
  // Try to get the default export directly
  PQueue = require('p-queue');
  // If PQueue is an object with a default property, use that
  if (PQueue && typeof PQueue === 'object' && PQueue.default) {
    PQueue = PQueue.default;
  }
} catch (error) {
  console.error('Error loading p-queue:', error.message);
  // Fallback to a simple queue implementation if p-queue fails to load
  PQueue = class SimpleQueue {
    constructor(options = {}) {
      this.concurrency = options.concurrency || 1;
      this._queue = [];
      this._pending = 0;
      this._resolveEmpty = null;
      this._onIdle = null;
    }
    
    add(fn) {
      const promise = new Promise((resolve, reject) => {
        this._queue.push({ fn, resolve, reject });
      });
      this._process();
      return promise;
    }
    
    async _process() {
      if (this._pending >= this.concurrency || this._queue.length === 0) {
        return;
      }
      
      const item = this._queue.shift();
      this._pending++;
      
      try {
        const result = await item.fn();
        item.resolve(result);
      } catch (error) {
        item.reject(error);
      } finally {
        this._pending--;
        this._process();
        
        if (this._pending === 0 && this._queue.length === 0 && this._resolveEmpty) {
          this._resolveEmpty();
        }
      }
    }
    
    onIdle() {
      if (this._pending === 0 && this._queue.length === 0) {
        return Promise.resolve();
      }
      
      return new Promise(resolve => {
        this._resolveEmpty = resolve;
      });
    }
    
    get size() {
      return this._queue.length;
    }
  };
}

/**
 * DocsToMarkdown - A class to scrape documentation sites and convert to markdown
 * Extends EventEmitter to emit progress events
 */
class DocsToMarkdown extends EventEmitter {
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
    super(); // Call EventEmitter constructor
    this.baseUrl = options.baseUrl;
    this.outputDir = options.outputDir || './docs';
    this.libraryInfo = options.libraryInfo || {}; // Add library info property
    this.visitedUrls = new Set(); // Fully processed URLs
    this.queuedUrls = new Set(); // URLs in the queue
    this.inProgressUrls = new Set(); // URLs currently being processed
    this.baseUrlObj = new URL(options.baseUrl);
    this.allowedDomains = options.allowedDomains || [this.baseUrlObj.hostname];
    // Use provided maxPages, or fall back to MAX_PAGES_PER_SITE from .env, or default to 0 (unlimited)
    this.maxPages = options.maxPages !== undefined ? options.maxPages : (parseInt(process.env.MAX_PAGES_PER_SITE, 10) || 0);
    this.useHeadless = options.useHeadless !== false;
    
    // URL filtering options
    this.baseUrlPath = this.baseUrlObj.pathname;
    this.enforceBasePath = options.enforceBasePath !== false;
    
    // URL blacklist - patterns to skip
    this.urlBlacklist = options.urlBlacklist || [
      // Common non-documentation pages
      '/blog/', 
      '/news/',
      '/forum/',
      '/community/',
      '/download/',
      '/about/',
      '/contact/',
      '/terms/',
      '/privacy/',
      '/login/',
      '/register/',
      '/pricing/',
      '/careers/',
      '/jobs/',
      '/team/',
      
      // Social media and external services
      '/twitter/',
      '/facebook/',
      '/linkedin/',
      '/youtube/',
      '/github.com/',
      '/discord/',
      '/slack/',
      
      // E-commerce/marketing
      '/store/',
      '/shop/',
      '/buy/',
      '/purchase/',
      '/cart/',
      '/checkout/',
      '/subscribe/',
      
      // User account related
      '/account/',
      '/profile/',
      '/dashboard/',
      '/settings/',
      '/preferences/',
      
      // Support/feedback
      '/support/',
      '/help-center/',
      '/faq/',
      '/ticket/',
      '/feedback/',
      '/survey/',
      
      // Events/webinars
      '/events/',
      '/webinar/',
      '/conference/',
      '/meetup/',
      '/workshop/',
      
      // Miscellaneous
      '/search/',
      '/print/',
      '/share/',
      '/comment/',
      '/vote/',
      '/stats/',
      '/analytics/',
      '/feed/',
      '/sitemap/',
      '/archive/'
    ];
    
    // Query parameters to keep
    this.queryParamsToKeep = options.queryParamsToKeep || [
      // Version related
      'version',
      'v',
      'ver',
      
      // Language/localization
      'lang',
      'locale',
      'language',
      
      // Content display
      'theme',
      'view',
      'format',
      
      // API specific
      'api-version',
      'endpoint',
      'namespace',
      
      // Documentation specific
      'section',
      'chapter',
      'topic',
      'module',
      'component',
      'function',
      'method',
      'class',
      'example'
    ];
    
    // Basic exclusion selectors for article extraction fallback
    this.excludeSelectors = [
      'script',
      'style',
      'noscript',
      'iframe',
      'object',
      'embed'
    ];

    // Allow user-provided exclude selectors to override or add to our defaults
    if (options.excludeSelectors && Array.isArray(options.excludeSelectors)) {
      this.excludeSelectors.push(...options.excludeSelectors);
    }

    // Concurrency settings
    this.concurrency = options.concurrency || 10;
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
    
    // Handle index URL case
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
   * Clean up markdown content to remove excessive blank lines and fix formatting
   * @param {string} markdown - The markdown content to clean up
   * @returns {string} The cleaned markdown content
   */
  cleanupMarkdown(markdown) {
    let cleaned = markdown
      // Fix navigation elements with excessive whitespace
      .replace(/\*\s+\[\s+\n+\s+([^\n]+)\s+\n+\s+\n+\s+\n+\s+\]\(([^)]+)\)/g, '* [$1]($2)')
      
      // Clean up excessive blank lines
      .replace(/\n{3,}/g, '\n\n')
      
      // Ensure proper spacing around headings
      .replace(/\n{2,}(#{1,6}\s)/g, '\n\n$1')
      .replace(/^(#{1,6}\s.*)\n{3,}/gm, '$1\n\n')
      
      // Fix list formatting
      .replace(/\n{2,}(\*\s)/g, '\n$1')
      .replace(/(\*\s.*)\n{2,}(\*\s)/g, '$1\n$2')
      
      // Clean up code blocks
      .replace(/```\n{2,}/g, '```\n')
      .replace(/\n{2,}```/g, '\n```')
      
      // Remove empty list items
      .replace(/\*\s*\n\s*\*/g, '*')
      
      // Trim leading/trailing whitespace
      .trim();
    
    // Apply site-specific cleanup if needed
    if (this.baseUrl && this.baseUrl.includes('modelcontextprotocol.io')) {
      cleaned = this.cleanupMintlifyMarkdown(cleaned);
    }
    
    return cleaned;
  }
  
  /**
   * Special cleanup for Mintlify-based sites like modelcontextprotocol.io
   * @param {string} markdown - The markdown content to clean up
   * @returns {string} The cleaned markdown content
   */
  cleanupMintlifyMarkdown(markdown) {
    return markdown
      // Remove navigation links at top
      .replace(/\[Model Context Protocol home page.*?\]\(index\.md\)/s, '')
      
      // Remove search elements
      .replace(/Search\.\.\.\n\n⌘K\n\nSearch\.\.\.\n\nNavigation/s, '')
      
      // Remove duplicate navigation elements
      .replace(/\[Documentation\n\n\]\(_introduction\.md\)\[SDKs\n\n\]\(_sdk_java_mcp-overview\.md\)\n\n\[Documentation\n\n\]\(_introduction\.md\)\[SDKs\n\n\]\(_sdk_java_mcp-overview\.md\)/s, '')
      
      // Remove GitHub link
      .replace(/\*\s+\[\n\s+\n\s+GitHub\n\s+\n\s+\]\(https:\/\/github\.com\/modelcontextprotocol\)/s, '')
      
      // Remove "Was this page helpful" section
      .replace(/Was this page helpful\?\n\nYesNo/s, '')
      
      // Remove "On this page" section and its contents
      .replace(/On this page[\s\S]*$/s, '')
      
      // Remove navigation links at bottom
      .replace(/\[For Server Developers\]\(_quickstart_server\.md\)/s, '')
      
      // Clean up empty sections
      .replace(/##\s+\[\s+​\s+\]\(#[^\)]+\)\s+\n+##/g, '##')
      
      // Fix section headers with links
      .replace(/##\s+\[\s+​\s+\]\(#([^\)]+)\)\s+([^\n]+)/g, '## $2')
      .replace(/###\s+\[\s+​\s+\]\(#([^\)]+)\)\s+([^\n]+)/g, '### $2')
      .replace(/####\s+\[\s+​\s+\]\(#([^\)]+)\)\s+([^\n]+)/g, '#### $2')
      
      // Fix empty links with just whitespace
      .replace(/\[\s+\n+\s+\]\(([^\)]+)\)/g, '')
      
      // Fix links with excessive whitespace
      .replace(/\[\s+\n+\s+([^\n]+)\s+\n+\s+\]\(([^\)]+)\)/g, '[$1]($2)')
      
      // Remove any remaining navigation artifacts
      .replace(/Navigation\s+\n+Get Started\s+\n+Introduction/s, '')
      
      // Final cleanup of excessive whitespace
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  /**
   * Configure the Turndown service with custom rules
   */
  configureTurndown() {
    // Preserve code blocks
    this.turndownService.addRule('codeBlock', {
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
      filter: function(node, options) {
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
          
          // If it's an internal link (same allowed domain)
          if (self.allowedDomains.includes(url.hostname)) {
            // Store the hash part
            const hash = url.hash;
            
            // Remove hash temporarily
            url.hash = '';
            
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
    
    // Handle images
    this.turndownService.addRule('images', {
      filter: 'img',
      replacement: function(content, node) {
        const alt = node.getAttribute('alt') || '';
        const src = node.getAttribute('src') || '';
        
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
    
    // Emit initialization event
    this.emit('init', {
      baseUrl: this.baseUrl,
      maxPages: this.maxPages
    });
    
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
    
    // Calculate final stats
    const stats = {
      processed: this.stats.processed,
      failed: this.stats.failed,
      duration: duration,
      pagesPerSecond: (this.stats.processed / duration).toFixed(2)
    };
    
    // Emit completion event
    this.emit('complete', stats);
    
    console.log(`Scraping complete in ${duration.toFixed(2)} seconds.`);
    console.log(`Processed: ${this.stats.processed} pages`);
    console.log(`Failed: ${this.stats.failed} pages`);
    console.log(`Pages per second: ${(this.stats.processed / duration).toFixed(2)}`);
    
    return stats;
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
        
        // Emit progress event
        this.emit('progress', {
          type: 'processing',
          url: url,
          processed: this.visitedUrls.size,
          maxPages: this.maxPages || 'unlimited',
          queueSize: this.queue.size,
          inProgress: this.inProgressUrls.size
        });
        
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
    try {
      // First try to extract content using article-extractor
      const article = await extract(url);
      
      if (article && article.content) {
        // If article extraction was successful, convert the HTML content to markdown
        let markdown = this.turndownService.turndown(article.content);
        
        // Apply post-processing cleanup
        markdown = this.cleanupMarkdown(markdown);
        
        // Save the file with library info
        await this.saveMarkdown(url, markdown, this.libraryInfo);
        return;
      }
    } catch (error) {
      console.log(`Article extraction failed for ${url}, falling back to basic extraction: ${error.message}`);
    }
    
    // Fallback to basic extraction if article-extractor fails
    console.log(`Using fallback extraction for ${url}`);
    
    // Extract the main content using basic selectors
    let content = $('body');
    
    // Remove elements that shouldn't be included
    for (const selector of this.excludeSelectors) {
      $(selector, content).remove();
    }
    
    // Convert to markdown
    let markdown = this.turndownService.turndown(content.html() || '');
    
    // Apply post-processing cleanup
    markdown = this.cleanupMarkdown(markdown);
    
    // Save the file with library info
    await this.saveMarkdown(url, markdown, this.libraryInfo);
  }

  /**
   * Preprocess a URL to determine if it should be added to the queue
   * @param {string} url - The URL to process
   * @param {string} sourceUrl - The URL where this link was found
   * @returns {string|null} - Normalized URL or null if rejected
   */
  preprocessUrl(url, sourceUrl) {
    try {
      // Parse URLs
      const urlObj = new URL(url);
      const sourceUrlObj = new URL(sourceUrl);
      
      // 1. Basic normalization
      // Remove hash
      urlObj.hash = '';
      
      // 2. Domain check (already in extractLinks, but double-check)
      if (!this.allowedDomains.includes(urlObj.hostname)) {
        // console.log(`Skipping URL ${url} - domain not allowed`);
        return null;
      }
      
      // 3. Base path check - ensure URL contains the base path if enforced
      if (this.enforceBasePath && this.baseUrlPath && this.baseUrlPath !== '/') {
        // Skip URLs that don't contain the base path
        if (!urlObj.pathname.startsWith(this.baseUrlPath)) {
          // console.log(`Skipping URL ${url} - doesn't match base path ${this.baseUrlPath}`);
          return null;
        }
      }
      
      // 4. Check against blacklist patterns
      const path = urlObj.pathname.toLowerCase();
      for (const pattern of this.urlBlacklist) {
        if (path.includes(pattern.toLowerCase())) {
          // console.log(`Skipping URL ${url} - matches blacklist pattern ${pattern}`);
          return null;
        }
      }
      
      // 5. Check for common file extensions that aren't documentation
      const fileExtensions = ['.pdf', '.zip', '.tar.gz', '.tgz', '.exe', '.dmg', '.pkg', 
                             '.jpg', '.jpeg', '.png', '.gif', '.svg', '.mp4', '.webm', '.mp3', '.wav'];
      for (const ext of fileExtensions) {
        if (path.endsWith(ext)) {
          // console.log(`Skipping URL ${url} - non-documentation file extension ${ext}`);
          return null;
        }
      }
      
      // 6. Handle query parameters
      if (urlObj.search) {
        const params = new URLSearchParams(urlObj.search);
        const newParams = new URLSearchParams();
        
        // Only keep specified parameters
        for (const param of this.queryParamsToKeep) {
          if (params.has(param)) {
            newParams.set(param, params.get(param));
          }
        }
        
        // Update URL with filtered parameters
        urlObj.search = newParams.toString();
      }
      
      // 7. Check for duplicate content with trailing slash variations
      // Normalize trailing slashes to avoid duplicates
      if (urlObj.pathname !== '/' && urlObj.pathname.endsWith('/')) {
        urlObj.pathname = urlObj.pathname.slice(0, -1);
      }
      
      // 8. Check for common URL patterns that indicate pagination or sorting
      // These often lead to duplicate content with different ordering
      const paginationParams = ['page', 'p', 'pg', 'start', 'offset'];
      const sortingParams = ['sort', 'order', 'sortBy', 'orderBy', 'direction'];
      
      // If URL has pagination or sorting parameters but no content-specific parameters,
      // it might be duplicate content - check if we should keep it
      let hasPaginationOrSorting = false;
      let hasContentParams = false;
      
      if (urlObj.search) {
        const params = new URLSearchParams(urlObj.search);
        
        // Check for pagination/sorting params
        for (const param of [...paginationParams, ...sortingParams]) {
          if (params.has(param)) {
            hasPaginationOrSorting = true;
            break;
          }
        }
        
        // Check for content-specific params (those we want to keep)
        for (const param of this.queryParamsToKeep) {
          if (params.has(param)) {
            hasContentParams = true;
            break;
          }
        }
        
        // If it has pagination/sorting but no content params, consider skipping
        // But only if it's not the first page (page=1 or no page param)
        if (hasPaginationOrSorting && !hasContentParams) {
          const page = params.get('page') || params.get('p') || params.get('pg') || '1';
          if (page !== '1') {
            // console.log(`Skipping URL ${url} - pagination without content params`);
            return null;
          }
        }
      }
      
      // 9. Check for URL depth - very deep URLs are often not useful for documentation
      const pathSegments = urlObj.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 5) {
        // For deep URLs, be more selective - only follow if they look like documentation
        const docPatterns = ['/api/', '/reference/', '/guide/', '/tutorial/', '/example/', '/doc/'];
        let isDocPath = false;
        
        for (const pattern of docPatterns) {
          if (urlObj.pathname.includes(pattern)) {
            isDocPath = true;
            break;
          }
        }
        
        if (!isDocPath) {
          // console.log(`Skipping URL ${url} - too deep and not documentation path`);
          return null;
        }
      }
      
      // Return normalized URL
      return urlObj.toString();
    } catch (error) {
      console.error(`Error preprocessing URL ${url}:`, error.message);
      return null;
    }
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
        
        // Preprocess the URL
        const normalizedUrl = this.preprocessUrl(url.toString(), baseUrl);
        
        // Skip if preprocessing rejected the URL
        if (!normalizedUrl) {
          return;
        }
        
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
    
    // Emit saved event
    this.emit('progress', {
      type: 'saved',
      url: url,
      outputPath: outputPath,
      processed: this.visitedUrls.size,
      total: this.maxPages > 0 ? this.maxPages : this.getTotalPageCount(),
      progress: this.maxPages > 0 ? 
        Math.floor((this.visitedUrls.size / this.maxPages) * 100) : 
        Math.floor((this.visitedUrls.size / this.getTotalPageCount()) * 100)
    });
    
    console.log(`Saved ${url} to ${outputPath}`);
  }
}

module.exports = DocsToMarkdown;
