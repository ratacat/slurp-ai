import axios from 'axios';
import * as cheerioModule from 'cheerio';
const cheerio = cheerioModule.default || cheerioModule;
import puppeteer from 'puppeteer';
import TurndownService from 'turndown';
import fs from 'fs-extra';
import path from 'path';
import { URL } from 'url';
import EventEmitter from 'events';
import { extract } from '@extractus/article-extractor';
import { resolvePath } from './utils/pathUtils.js';
import { cleanupMarkdown as sharedCleanupMarkdown } from './utils/markdownUtils.js';
import { log } from './utils/logger.js'; // Import the logger utility
import config, { paths, scraping, urlFiltering } from '../config.js';
// Handle potential default export for p-queue (ESM compatibility)
import PQueueModule from 'p-queue';
let PQueueImport = PQueueModule;
if (PQueueImport && typeof PQueueImport === 'object' && PQueueImport.default) {
  PQueueImport = PQueueImport.default;
}
const PQueue = PQueueImport;

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
   * @param {string[]} options.excludeSelectors - CSS selectors to exclude from content
   * @param {number} options.concurrency - Number of pages to process concurrently (default: 5)
   * @param {number} options.retryCount - Number of times to retry failed requests (default: 3)
   * @param {number} options.retryDelay - Delay between retries in ms (default: 1000)
   * @param {AbortSignal} [options.signal] - Optional AbortSignal for cancellation.
   */
  constructor(options) {
    super();
    this.baseUrl = options.baseUrl;
    this.basePath = options.basePath || paths.basePath;
    this.outputDir = resolvePath(options.outputDir || paths.inputDir, this.basePath);
    this.libraryInfo = options.libraryInfo || {};
    this.visitedUrls = new Set();
    this.queuedUrls = new Set();
    this.inProgressUrls = new Set();
    this.baseUrlObj = new URL(options.baseUrl);
    this.allowedDomains = options.allowedDomains || [this.baseUrlObj.hostname];
    
    this.maxPages = options.maxPages !== undefined ? 
      options.maxPages :
      scraping.maxPagesPerSite;
    
    this.useHeadless = options.useHeadless !== undefined ?
      options.useHeadless :
      !scraping.useHeadless;
    
    this.enforceBasePath = options.enforceBasePath !== undefined ?
      options.enforceBasePath :
      urlFiltering.enforceBasePath;
    
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
    
    this.excludeSelectors = [
      'script',
      'style',
      'noscript',
      'iframe',
      'object',
      'embed'
    ];

    if (options.excludeSelectors && Array.isArray(options.excludeSelectors)) {
      this.excludeSelectors.push(...options.excludeSelectors);
    }

    const envQueryParams = urlFiltering.preserveQueryParams;
    
    this.queryParamsToKeep = options.queryParamsToKeep || envQueryParams || [
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
    
    this.concurrency = options.concurrency ||
      scraping.concurrency;
      
    this.retryCount = options.retryCount ||
      scraping.retryCount;
      
    this.retryDelay = options.retryDelay ||
      scraping.retryDelay;
    
    this.queue = new PQueue({
      concurrency: this.concurrency,
      autoStart: true
    });
    
    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced'
    });
    
    this.configureTurndown();
    
    this.stats = {
      processed: 0,
      failed: 0,
      startTime: null,
      endTime: null
    };
    this.signal = options.signal;

    // Add listener to stop queue if signal is aborted externally
    this.signal?.addEventListener('abort', () => {
      log.warn('Scraping', 'Abort signal received. Stopping scrape queue.');
      this.stopQueue();
    });
  }

  /**
   * Generate a consistent filename for a given URL
   * @param {string} url - The URL to convert to a filename
   * @returns {string} The filename with .md extension
   */
  getFilenameForUrl(url) {
    const urlObj = new URL(url);
    let filename = urlObj.pathname.replace(/\//g, '_');
    
    if (filename === '' || filename === '_') {
      filename = 'index';
    }
    
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
    let cleaned = sharedCleanupMarkdown(markdown);
    
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
      .replace(/\[Model Context Protocol home page.*?\]\(index\.md\)/s, '')
      
      .replace(/Search\.\.\.\n\n⌘K\n\nSearch\.\.\.\n\nNavigation/s, '')
      
      .replace(/\[Documentation\n\n\]\(_introduction\.md\)\[SDKs\n\n\]\(_sdk_java_mcp-overview\.md\)\n\n\[Documentation\n\n\]\(_introduction\.md\)\[SDKs\n\n\]\(_sdk_java_mcp-overview\.md\)/s, '')
      
      .replace(/\*\s+\[\n\s+\n\s+GitHub\n\s+\n\s+\]\(https:\/\/github\.com\/modelcontextprotocol\)/s, '')
      
      .replace(/Was this page helpful\?\n\nYesNo/s, '')
      
      .replace(/On this page[\s\S]*$/s, '')
      
      .replace(/\[For Server Developers\]\(_quickstart_server\.md\)/s, '')
      
      .replace(/##\s+\[\s+​\s+\]\(#[^\)]+\)\s+\n+##/g, '##')
      
      .replace(/##\s+\[\s+​\s+\]\(#([^\)]+)\)\s+([^\n]+)/g, '## $2')
      .replace(/###\s+\[\s+​\s+\]\(#([^\)]+)\)\s+([^\n]+)/g, '### $2')
      .replace(/####\s+\[\s+​\s+\]\(#([^\)]+)\)\s+([^\n]+)/g, '#### $2')
      
      .replace(/\[\s+\n+\s+\]\(([^\)]+)\)/g, '')
      
      .replace(/\[\s+\n+\s+([^\n]+)\s+\n+\s+\]\(([^\)]+)\)/g, '[$1]($2)')
      
      .replace(/Navigation\s+\n+Get Started\s+\n+Introduction/s, '')
      
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  /**
   * Configure the Turndown service with custom rules
   */
  configureTurndown() {
    this.turndownService.addRule('codeBlock', {
      filter: ['pre'],
      replacement: function(content, node) {
        const language = node.querySelector('code') ? 
          node.querySelector('code').className.replace('language-', '') : '';
        return `\n\`\`\`${language}\n${content}\n\`\`\`\n`;
      }
    });
    
    this.turndownService.addRule('tables', {
      filter: ['table'],
      replacement: function(content) {
        return '\n\n' + content + '\n\n';
      }
    });
    
    const self = this;
    this.turndownService.addRule('internalLinks', {
      filter: function(node, options) {
        return node.nodeName === 'A' && node.getAttribute('href');
      },
      replacement: function(content, node, options) {
        const href = node.getAttribute('href');
        
        if (!href || href.startsWith('javascript:')) {
          return content;
        }
        
        try {
          const url = new URL(href, self.baseUrl);
          
          if (href.startsWith('#')) {
            return `[${content}](${href})`;
          }
          
          if (self.allowedDomains.includes(url.hostname)) {
            const hash = url.hash;
            
            url.hash = '';
            
            let fullUrl;
            
            if (!url.protocol || url.hostname === '') {
              const baseUrlPath = new URL(self.baseUrl).pathname;
              
              if (href.startsWith('.') || (!href.startsWith('/') && !href.startsWith('http'))) {
                const currentPath = new URL(node.baseURI || self.baseUrl).pathname;
                const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                
                const resolvedPath = new URL(href, new URL(currentDir, self.baseUrl)).pathname;
                fullUrl = new URL(resolvedPath, self.baseUrl).toString();
              } else {
                fullUrl = new URL(url.toString(), self.baseUrl).toString();
              }
            } else {
              fullUrl = url.toString();
            }
            
            const targetFilename = self.getFilenameForUrl(fullUrl);
            
            return `[${content}](${targetFilename}${hash})`;
          } else {
            return `[${content}](${href})`;
          }
        } catch (error) {
          log.verbose(`Error processing link ${href}: ${error.message}`);
          return `[${content}](${href})`;
        }
      }
    });
    
    this.turndownService.addRule('images', {
      filter: 'img',
      replacement: function(content, node) {
        const alt = node.getAttribute('alt') || '';
        const src = node.getAttribute('src') || '';
        
        
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
    if (this.signal?.aborted) {
      log.warn('Scraping', 'Scrape aborted before starting.');
      throw new Error('Scrape aborted');
    }
    this.stats.startTime = new Date();
    
    this.emit('init', {
      baseUrl: this.baseUrl,
      maxPages: this.maxPages
    });
    
    await fs.ensureDir(this.outputDir);
    
    let browser = null;
    if (this.useHeadless) {
      browser = await puppeteer.launch({ headless: 'new' });
    }
    
    this.addToQueue(this.baseUrl, browser);
    log.verbose(`Waiting for scraping phase to complete... Initial Queue Size: ${this.queue.size}, Pending: ${this.queue.pending}`);

    
    const checkInterval = 2000;
    const internalTimeout = scraping.timeout;
    const hangTimeout = internalTimeout * 1.5; // Timeout if no progress for 1.5x task timeout
    let lastProcessedCount = -1;
    let lastProgressTime = Date.now();
    
    while (this.queue.size > 0 || this.queue.pending > 0) {
      await new Promise(resolve => setTimeout(resolve, checkInterval));
      
      log.verbose(`Queue Check - Size: ${this.queue.size}, Pending: ${this.queue.pending}, Processed: ${this.stats.processed}`);
      
      if (this.stats.processed > lastProcessedCount) {
        lastProcessedCount = this.stats.processed;
        lastProgressTime = Date.now();
      } else {
        if (Date.now() - lastProgressTime > hangTimeout) {
          log.warn('Scraping', `No progress for ${hangTimeout / 1000}s. Assuming hung tasks. Proceeding...`);
          // this.queue.stop();
          break;
        }
      }
    }
    
    log.verbose(`Scraping loop finished. Final Queue Size: ${this.queue.size}, Pending: ${this.queue.pending}`);

    // Close browser after scraping loop finishes (either idle or timeout break)
    if (browser) {
      log.verbose('Closing browser...');
      try {
         await browser.close();
         log.verbose('Browser closed.');
      } catch (closeError) {
         log.warn('Scraping', `Error closing browser: ${closeError.message}`);
      }
    }
    
    this.stats.endTime = new Date(); // Calculate stats after queue idle and browser close
    const duration = (this.stats.endTime - this.stats.startTime) / 1000;
    
    const stats = {
      processed: this.stats.processed,
      failed: this.stats.failed,
      duration: duration,
      pagesPerSecond: (this.stats.processed / duration).toFixed(2)
    };
    
    this.emit('complete', stats);
    
    return stats;
  }

  /**
   * Forcefully stops the queue, rejecting pending promises.
   */
  stopQueue() {
    log.verbose('Forcefully stopping the queue...');
    this.queue.stop();
    log.verbose('Queue stop command issued.');
  }

  /**
   * Add a URL to the processing queue
   * @param {string} url - The URL to process
   * @param {Browser} browser - Puppeteer browser instance
   * @returns {boolean} Whether the URL was added to the queue
   */
  addToQueue(url, browser) {
    if (this.signal?.aborted) {
      return false;
    }

    if (this.visitedUrls.has(url) || this.inProgressUrls.has(url) || this.queuedUrls.has(url)) {
      return false;
    }
    
    if (this.hasReachedMaxPages()) {
      if (this.getTotalPageCount() === this.maxPages) {
         log.verbose(`Reached maximum of ${this.maxPages} pages. No longer adding new URLs to the queue.`);
      }
      return false;
    }
    
    this.queuedUrls.add(url);
    
    // Use timeout from config, add a buffer of 5s
    const internalTimeout = scraping.timeout;
    const taskTimeout = internalTimeout + 5000; // Task timeout slightly longer than internal
    this.queue.add(async () => {
      if (this.signal?.aborted) {
        log.verbose(`Task for ${url} cancelled before execution.`);
        this.queuedUrls.delete(url); // Ensure it's removed if cancelled before starting
        throw new Error('Scrape aborted');
      }

      const taskId = `Task-${url.substring(url.lastIndexOf('/') + 1)}`;
      try {
        log.verbose(`${taskId}: Starting execution.`);
        this.queuedUrls.delete(url);
        this.inProgressUrls.add(url);
        
        this.emit('progress', {
          type: 'processing',
          url: url,
          processed: this.visitedUrls.size,
          maxPages: this.maxPages || 'unlimited',
          queueSize: this.queue.size,
          inProgress: this.inProgressUrls.size
        });

        if (this.signal?.aborted) throw new Error('Scrape aborted');

        let html;
        log.verbose(`${taskId}: Fetching content (headless=${this.useHeadless})...`);
        if (this.useHeadless && browser) {
          const page = await browser.newPage();
          let pageError = null;
          try {
              await page.setDefaultNavigationTimeout(60000);
              await page.goto(url, { waitUntil: 'networkidle2' });
              html = await page.content();
              log.verbose(`${taskId}: Puppeteer fetch successful.`);
          } catch (err) {
              pageError = err;
              log.verbose(`${taskId}: Puppeteer navigation/content error: ${err.message}`);
          } finally {
              if (page && !page.isClosed()) {
                  await page.close();
              }
          }
          if (pageError) throw pageError;
        } else {
           log.verbose(`${taskId}: Using axios.`);
           const response = await axios.get(url, {
             timeout: 60000, // Match timeout
             headers: {
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
             }
           }, { timeout: taskTimeout });
           html = response.data;
           log.verbose(`${taskId}: Axios fetch successful.`);
        }
        
        log.verbose(`${taskId}: Loading content into cheerio...`);
        const $ = cheerio.load(html);
        
        log.verbose(`${taskId}: Extracting links...`);
        const newUrls = this.extractLinks($, url);
        log.verbose(`${taskId}: Found ${newUrls.length} links.`);
        
        if (!this.hasReachedMaxPages()) {
          log.verbose(`${taskId}: Adding ${newUrls.length} new URLs to queue...`);
          for (const newUrl of newUrls) {
            this.addToQueue(newUrl, browser);
          }
        } else {
           log.verbose(`${taskId}: Max pages reached, not adding extracted links.`);
        }

        if (this.signal?.aborted) throw new Error('Scrape aborted');

        log.verbose(`${taskId}: Processing page content...`);
        await this.processPage(url, $);
        log.verbose(`${taskId}: Page content processed.`);
        
        this.visitedUrls.add(url);
        this.stats.processed++;
        log.verbose(`${taskId}: Marked as visited. Processed count: ${this.stats.processed}`);
        
      } catch (error) {
        log.verbose(`${taskId}: Error caught - ${error.message}`);
        log.verbose(`Error processing ${url}: ${error.message}`);
        log.error('Scraping', `Failed to process ${url}: ${error.message}`);
        this.stats.failed++;
      } finally {
        // This block MUST execute to ensure the task is removed from the inProgress set
        this.inProgressUrls.delete(url);
        log.verbose(`${taskId}: Finished execution (finally block). InProgress size: ${this.inProgressUrls.size}`);
      }
    });
    log.verbose(`Added task for ${url}. Queue Size: ${this.queue.size}, Pending: ${this.queue.pending}`);
    return true;
  }

  /**
   * Process a page - extract content and convert to markdown
   * @param {string} url - The URL of the page 
   * @param {CheerioStatic} $ - Cheerio instance with loaded HTML
   */
  async processPage(url, $) {
    try {
      const article = await extract(url);
      
      if (article && article.content) {
        let markdown = this.turndownService.turndown(article.content);
        
        markdown = this.cleanupMarkdown(markdown);
        
        await this.saveMarkdown(url, markdown, this.libraryInfo);
        return;
      }
    } catch (error) {
    }
    
    let content = $('body');
    
    for (const selector of this.excludeSelectors) {
      $(selector, content).remove();
    }
    
    let markdown = this.turndownService.turndown(content.html() || '');
    
    markdown = this.cleanupMarkdown(markdown);
    
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
      const urlObj = new URL(url);
      const sourceUrlObj = new URL(sourceUrl);
      
      urlObj.hash = '';
      
      if (!this.allowedDomains.includes(urlObj.hostname)) {
        return null;
      }

      if (this.enforceBasePath) {
        const urlString = urlObj.toString();
        if (!urlString.startsWith(this.basePath)) {
          log.verbose(`Skipping URL ${urlString} - doesn't start with enforced base path ${this.basePath}`);
          return null;
        }
      }
      
      
      const path = urlObj.pathname.toLowerCase();
      for (const pattern of this.urlBlacklist) {
        if (path.includes(pattern.toLowerCase())) {
          return null;
        }
      }
      
      const fileExtensions = ['.pdf', '.zip', '.tar.gz', '.tgz', '.exe', '.dmg', '.pkg', 
                             '.jpg', '.jpeg', '.png', '.gif', '.svg', '.mp4', '.webm', '.mp3', '.wav'];
      for (const ext of fileExtensions) {
        if (path.endsWith(ext)) {
          return null;
        }
      }
      
      if (urlObj.search) {
        const params = new URLSearchParams(urlObj.search);
        const newParams = new URLSearchParams();
        
        for (const param of this.queryParamsToKeep) {
          if (params.has(param)) {
            newParams.set(param, params.get(param));
          }
        }
        
        urlObj.search = newParams.toString();
      }
      
      if (urlObj.pathname !== '/' && urlObj.pathname.endsWith('/')) {
        urlObj.pathname = urlObj.pathname.slice(0, -1);
      }
      
      const paginationParams = ['page', 'p', 'pg', 'start', 'offset'];
      const sortingParams = ['sort', 'order', 'sortBy', 'orderBy', 'direction'];
      
      let hasPaginationOrSorting = false;
      let hasContentParams = false;
      
      if (urlObj.search) {
        const params = new URLSearchParams(urlObj.search);
        
        for (const param of [...paginationParams, ...sortingParams]) {
          if (params.has(param)) {
            hasPaginationOrSorting = true;
            break;
          }
        }
        
        for (const param of this.queryParamsToKeep) {
          if (params.has(param)) {
            hasContentParams = true;
            break;
          }
        }
        
        if (hasPaginationOrSorting && !hasContentParams) {
          const page = params.get('page') || params.get('p') || params.get('pg') || '1';
          if (page !== '1') {
            return null;
          }
        }
      }
      
      const pathSegments = urlObj.pathname.split('/').filter(Boolean);
      if (pathSegments.length > urlFiltering.depthNumberOfSegments) {
        const docPatterns = urlFiltering.depthSegmentCheck;
        let isDocPath = false;
        
        for (const pattern of docPatterns) {
          if (urlObj.pathname.includes(pattern)) {
            isDocPath = true;
            break;
          }
        }
        
        if (!isDocPath) {
          return null;
        }
      }
      
      return urlObj.toString();
    } catch (error) {
      log.verbose(`Error preprocessing URL ${url}: ${error.message}`);
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
      
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
        return;
      }
      
      try {
        const url = new URL(href, baseUrl);
        
        const normalizedUrl = this.preprocessUrl(url.toString(), baseUrl);
        
        if (!normalizedUrl) {
          return;
        }
        
        if (!this.visitedUrls.has(normalizedUrl) && 
            !this.inProgressUrls.has(normalizedUrl) && 
            !this.queuedUrls.has(normalizedUrl)) {
          newUrls.push(normalizedUrl);
        }
       } catch (error) {
         if (error instanceof TypeError && error.message.includes('Invalid URL')) {
           log.verbose(`Skipping invalid link found on page: ${href}`);
         } else {
           log.verbose(`Error processing link ${href}: ${error.message}`);
         }
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
    const filename = this.getFilenameForUrl(url);
    
    let outputDir = resolvePath(this.outputDir, this.basePath);
    
    if (options.library) {
      outputDir = path.join(outputDir, options.library);
      
      if (options.version) {
        outputDir = path.join(outputDir, options.version);
      }
    }
    
    await fs.ensureDir(outputDir);
    
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
  }
}

export default DocsToMarkdown;
