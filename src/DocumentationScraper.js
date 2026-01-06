import axios from 'axios';
import * as cheerioModule from 'cheerio';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import TurndownService from 'turndown';

// Use stealth plugin to evade bot detection
puppeteer.use(StealthPlugin());
import { gfm } from 'turndown-plugin-gfm';
import fs from 'fs-extra';
import path from 'path';
import { URL } from 'url';
import EventEmitter from 'events';
import { extract } from '@extractus/article-extractor';
import PQueueModule from 'p-queue';
import { resolvePath } from './utils/pathUtils.js';
import {
  cleanupMarkdown as sharedCleanupMarkdown,
  preprocessHtmlForCodeBlocks,
} from './utils/markdownUtils.js';
import { log } from './utils/logger.js';
import { paths, scraping, urlFiltering } from '../config.js';

/**
 * Patterns that indicate a 404/error page
 * Note: These are matched case-insensitively against page content
 */
const ERROR_PAGE_PATTERNS = [
  'page not found',
  "page doesn't exist",
  'page does not exist',
  '404 error',
  '404 not found',
  '404 - not found', // Common format with dash
  '404-not found',
  'not found',
  "couldn't find",
  'could not find',
  'no longer exists',
  'has been removed',
  'has been deleted',
  "doesn't exist",
  'does not exist',
  'unavailable',
  'error 404',
  'oops!',
  "we can't find",
  "we couldn't find",
  'this page is missing',
  'broken link',
  'dead link',
];

/**
 * Strong patterns that almost always indicate a 404/error page
 * Even a single match in the title or H1 should trigger detection
 */
const STRONG_404_PATTERNS = [
  /^404\s*[-–—]?\s*not\s*found$/i,  // "404 - Not found" as the only content
  /^not\s*found$/i,                  // Just "Not found"
  /^page\s*not\s*found$/i,           // "Page not found"
  /^error\s*404$/i,                  // "Error 404"
  /^404\s*error$/i,                  // "404 Error"
  /^404$/,                           // Just "404"
];

/**
 * HTTP status codes that indicate rate limiting
 */
const RATE_LIMIT_CODES = [429, 503];

/**
 * HTTP status codes that are retryable (transient errors)
 */
const RETRYABLE_CODES = [408, 429, 500, 502, 503, 504, 520, 521, 522, 523, 524];

/**
 * Sleep for a specified duration
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Calculate exponential backoff delay with jitter
 * @param {number} attempt - Current attempt number (0-indexed)
 * @param {number} baseDelay - Base delay in ms
 * @param {number} maxDelay - Maximum delay in ms (default: 30000)
 * @returns {number} Delay in ms
 */
function getBackoffDelay(attempt, baseDelay, maxDelay = 30000) {
  // Exponential backoff: baseDelay * 2^attempt
  const exponentialDelay = baseDelay * 2 ** attempt;
  // Add jitter (±25%) to prevent thundering herd
  const jitter = exponentialDelay * 0.25 * (Math.random() * 2 - 1);
  return Math.min(exponentialDelay + jitter, maxDelay);
}

/**
 * Check if HTML content appears to be a 404/error page
 * @param {string} html - The HTML content to check
 * @returns {boolean} True if the content looks like a 404 page
 */
function is404Content(html) {
  if (!html || typeof html !== 'string') return false;

  const lowerHtml = html.toLowerCase();

  // Extract title and h1 content for strong pattern matching
  // Use a more permissive regex that captures content even with nested tags
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  const h1Match = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);

  // Get text content, stripping any nested HTML tags
  const titleText = titleMatch
    ? titleMatch[1].replace(/<[^>]*>/g, '').trim()
    : '';
  const h1Text = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : '';

  // Check strong patterns in title or h1 - these are definitive 404 indicators
  for (const pattern of STRONG_404_PATTERNS) {
    if (pattern.test(titleText) || pattern.test(h1Text)) {
      log.verbose(`Detected 404 via strong pattern in title/h1: "${titleText || h1Text}"`);
      return true;
    }
  }

  // Check for common 404 patterns in short pages
  // Long pages are less likely to be error pages
  if (html.length < 10000) {
    const matchCount = ERROR_PAGE_PATTERNS.filter((pattern) =>
      lowerHtml.includes(pattern),
    ).length;

    // If multiple patterns match, it's very likely a 404 page
    if (matchCount >= 2) {
      log.verbose(`Detected 404 via multiple pattern matches (${matchCount})`);
      return true;
    }

    // For very short pages, even one match is suspicious
    if (html.length < 3000 && matchCount >= 1) {
      // Check if pattern is in a prominent place (title, h1)
      const titleLower = titleText.toLowerCase();
      const h1Lower = h1Text.toLowerCase();

      if (ERROR_PAGE_PATTERNS.some((p) => titleLower.includes(p))) {
        log.verbose(`Detected 404 via pattern in title: "${titleText}"`);
        return true;
      }
      if (ERROR_PAGE_PATTERNS.some((p) => h1Lower.includes(p))) {
        log.verbose(`Detected 404 via pattern in h1: "${h1Text}"`);
        return true;
      }
    }
  }

  return false;
}
// Handle potential default export for p-queue (ESM compatibility)
const cheerio = cheerioModule.default || cheerioModule;
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
    this.outputDir = resolvePath(
      options.outputDir || paths.inputDir,
      this.basePath,
    );
    this.libraryInfo = options.libraryInfo || {};
    this.visitedUrls = new Set();
    this.queuedUrls = new Set();
    this.inProgressUrls = new Set();
    this.baseUrlObj = new URL(options.baseUrl);
    this.allowedDomains = options.allowedDomains || [this.baseUrlObj.hostname];

    this.maxPages =
      options.maxPages !== undefined
        ? options.maxPages
        : scraping.maxPagesPerSite;

    this.useHeadless =
      options.useHeadless !== undefined
        ? options.useHeadless
        : !scraping.useHeadless;

    this.enforceBasePath =
      options.enforceBasePath !== undefined
        ? options.enforceBasePath
        : urlFiltering.enforceBasePath;

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
      '/archive/',
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
      'example',
    ];

    this.excludeSelectors = [
      'script',
      'style',
      'noscript',
      'iframe',
      'object',
      'embed',
    ];

    if (options.excludeSelectors && Array.isArray(options.excludeSelectors)) {
      this.excludeSelectors.push(...options.excludeSelectors);
    }

    const envQueryParams = urlFiltering.preserveQueryParams;

    this.queryParamsToKeep = options.queryParamsToKeep ||
      envQueryParams || [
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
        'example',
      ];

    this.concurrency = options.concurrency || scraping.concurrency;

    this.retryCount = options.retryCount || scraping.retryCount;

    this.retryDelay = options.retryDelay || scraping.retryDelay;

    this.queue = new PQueue({
      concurrency: this.concurrency,
      autoStart: true,
    });

    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });

    // Enable GFM (GitHub Flavored Markdown) for tables, strikethrough, etc.
    this.turndownService.use(gfm);

    this.configureTurndown();

    this.stats = {
      processed: 0,
      failed: 0,
      startTime: null,
      endTime: null,
      rawHtmlTokens: 0,
      markdownTokens: 0,
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
  static getFilenameForUrl(url) {
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
  static cleanupMintlifyMarkdown(markdown) {
    return markdown
      .replace(/\[Model Context Protocol home page.*?\]\(index\.md\)/s, '')

      .replace(/Search\.\.\.\n\n⌘K\n\nSearch\.\.\.\n\nNavigation/s, '')

      .replace(
        /\[Documentation\n\n\]\(_introduction\.md\)\[SDKs\n\n\]\(_sdk_java_mcp-overview\.md\)\n\n\[Documentation\n\n\]\(_introduction\.md\)\[SDKs\n\n\]\(_sdk_java_mcp-overview\.md\)/s,
        '',
      )

      .replace(
        /\*\s+\[\n\s+\n\s+GitHub\n\s+\n\s+\]\(https:\/\/github\.com\/modelcontextprotocol\)/s,
        '',
      )

      .replace(/Was this page helpful\?\n\nYesNo/s, '')

      .replace(/On this page[\s\S]*$/s, '')

      .replace(/\[For Server Developers\]\(_quickstart_server\.md\)/s, '')

      .replace(/##\s+\[\s+\s+\]\(#[^)]+\)\s+\n+##/g, '##')

      .replace(/##\s+\[\s+\s+\]\(#([^)]+)\)\s+([^\n]+)/g, '## $2')
      .replace(/###\s+\[\s+\s+\]\(#([^)]+)\)\s+([^\n]+)/g, '### $2')
      .replace(/####\s+\[\s+\s+\]\(#([^)]+)\)\s+([^\n]+)/g, '#### $2')

      .replace(/\[\s+\n+\s+\]\(([^)]+)\)/g, '')

      .replace(/\[\s+\n+\s+([^\n]+)\s+\n+\s+\]\(([^)]+)\)/g, '[$1]($2)')

      .replace(/Navigation\s+\n+Get Started\s+\n+Introduction/s, '')

      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  /**
   * Configure the Turndown service with custom rules
   */
  configureTurndown() {
    // Setup global references for use in Turndown rules
    globalThis.baseUrl = this.baseUrl;
    globalThis.allowedDomains = this.allowedDomains;
    globalThis.getFilenameForUrl = DocsToMarkdown.getFilenameForUrl;
    this.turndownService.addRule('codeBlock', {
      filter: ['pre'],
      replacement(content, node) {
        const language = node.querySelector('code')
          ? node.querySelector('code').className.replace('language-', '')
          : '';
        return `\n\`\`\`${language}\n${content}\n\`\`\`\n`;
      },
    });

    // Handle headings with empty anchors/spans (common in doc sites for deep linking)
    // This prevents "## \n\nHeading Text" broken patterns
    this.turndownService.addRule('headingsWithAnchors', {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      replacement(content, node) {
        const level = Number(node.nodeName.charAt(1));
        const hashes = '#'.repeat(level);
        // Clean up the content: remove empty brackets, trim whitespace
        const cleanContent = content
          .replace(/\[\]\([^)]*\)/g, '') // Remove empty links like [](_anchor)
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        return cleanContent ? `\n\n${hashes} ${cleanContent}\n\n` : '';
      },
    });

    // Tables are handled by the GFM plugin

    this.turndownService.addRule('internalLinks', {
      filter(node) {
        return node.nodeName === 'A' && node.getAttribute('href');
      },
      replacement(content, node) {
        const href = node.getAttribute('href');

        if (!href || href === '#') {
          return content;
        }

        try {
          const url = new URL(href, globalThis.baseUrl);

          if (href.startsWith('#')) {
            return `[${content}](${href})`;
          }

          if (globalThis.allowedDomains.includes(url.hostname)) {
            const { hash } = url;

            url.hash = '';

            let fullUrl;

            if (!url.protocol || url.hostname === '') {
              if (
                href.startsWith('.') ||
                (!href.startsWith('/') && !href.startsWith('http'))
              ) {
                const currentPath = new URL(node.baseURI || globalThis.baseUrl)
                  .pathname;
                const currentDir = currentPath.substring(
                  0,
                  currentPath.lastIndexOf('/') + 1,
                );

                const resolvedPath = new URL(
                  href,
                  new URL(currentDir, globalThis.baseUrl),
                ).pathname;
                fullUrl = new URL(resolvedPath, globalThis.baseUrl).toString();
              } else {
                fullUrl = new URL(
                  url.toString(),
                  globalThis.baseUrl,
                ).toString();
              }
            } else {
              fullUrl = url.toString();
            }

            const targetFilename = globalThis.getFilenameForUrl(fullUrl);

            return `[${content}](${targetFilename}${hash})`;
          }
          return `[${content}](${href})`;
        } catch (error) {
          log.verbose(`Error processing link ${href}: ${error.message}`);
          return `[${content}](${href})`;
        }
      },
    });

    this.turndownService.addRule('images', {
      filter: 'img',
      replacement(content, node) {
        const alt = node.getAttribute('alt') || '';
        const src = node.getAttribute('src') || '';

        return `![${alt}](${src})`;
      },
    });
  }

  /**
   * Get the total number of pages in all states (visited, in progress, queued)
   * @returns {number} Total pages count
   */
  getTotalPageCount() {
    return (
      this.visitedUrls.size + this.inProgressUrls.size + this.queuedUrls.size
    );
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
      maxPages: this.maxPages,
    });

    await fs.ensureDir(this.outputDir);

    let browser = null;
    if (this.useHeadless) {
      browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-blink-features=AutomationControlled',
          '--disable-infobars',
          '--window-size=1920,1080',
          '--start-maximized',
          '--disable-dev-shm-usage',
        ],
      });
    }

    this.addToQueue(this.baseUrl, browser);
    log.verbose(
      `Waiting for scraping phase to complete... Initial Queue Size: ${this.queue.size}, Pending: ${this.queue.pending}`,
    );

    const checkInterval = 2000;
    const internalTimeout = scraping.timeout;
    const hangTimeout = internalTimeout * 1.5; // Timeout if no progress for 1.5x task timeout
    let lastProcessedCount = -1;
    let lastProgressTime = Date.now();

    while (this.queue.size > 0 || this.queue.pending > 0) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        setTimeout(resolve, checkInterval);
      });

      log.verbose(
        `Queue Check - Size: ${this.queue.size}, Pending: ${this.queue.pending}, Processed: ${this.stats.processed}`,
      );

      if (this.stats.processed > lastProcessedCount) {
        lastProcessedCount = this.stats.processed;
        lastProgressTime = Date.now();
      } else if (Date.now() - lastProgressTime > hangTimeout) {
        log.warn(
          'Scraping',
          `No progress for ${hangTimeout / 1000}s. Assuming hung tasks. Proceeding...`,
        );
        // this.queue.stop();
        break;
      }
    }

    log.verbose(
      `Scraping loop finished. Final Queue Size: ${this.queue.size}, Pending: ${this.queue.pending}`,
    );

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
      duration,
      pagesPerSecond: (this.stats.processed / duration).toFixed(2),
      rawHtmlTokens: this.stats.rawHtmlTokens,
      markdownTokens: this.stats.markdownTokens,
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

    if (
      this.visitedUrls.has(url) ||
      this.inProgressUrls.has(url) ||
      this.queuedUrls.has(url)
    ) {
      return false;
    }

    if (this.hasReachedMaxPages()) {
      if (this.getTotalPageCount() === this.maxPages) {
        log.verbose(
          `Reached maximum of ${this.maxPages} pages. No longer adding new URLs to the queue.`,
        );
      }
      return false;
    }

    this.queuedUrls.add(url);

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
          url,
          processed: this.visitedUrls.size,
          maxPages: this.maxPages || 'unlimited',
          queueSize: this.queue.size,
          inProgress: this.inProgressUrls.size,
        });

        if (this.signal?.aborted) throw new Error('Scrape aborted');

        let html;
        log.verbose(
          `${taskId}: Fetching content (headless=${this.useHeadless})...`,
        );
        if (this.useHeadless && browser) {
          // Retry loop with exponential backoff for Puppeteer
          let lastError = null;
          for (let attempt = 0; attempt <= this.retryCount; attempt++) {
            const page = await browser.newPage();
            try {
              if (attempt > 0) {
                const delay = getBackoffDelay(attempt - 1, this.retryDelay);
                log.info(
                  'Scraping',
                  `${taskId}: Retry ${attempt}/${this.retryCount} after ${Math.round(delay)}ms delay`,
                );
                this.emit('progress', {
                  type: 'retry',
                  url,
                  attempt,
                  maxRetries: this.retryCount,
                  delay: Math.round(delay),
                });
                await sleep(delay);
              }

              await page.setDefaultNavigationTimeout(60000);
              // Set realistic viewport and user-agent to avoid bot detection
              await page.setViewport({ width: 1920, height: 1080 });
              await page.setUserAgent(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              );
              const response = await page.goto(url, { waitUntil: 'networkidle2' });

              // Check response status if available
              const status = response ? response.status() : 200;

              if (RATE_LIMIT_CODES.includes(status)) {
                log.warn(
                  'Scraping',
                  `${taskId}: Rate limited (${status}) via Puppeteer. Will retry.`,
                );
                this.emit('progress', {
                  type: 'rate_limited',
                  url,
                  status,
                  waitTime: getBackoffDelay(attempt, this.retryDelay),
                  retryAfter: null,
                });
                lastError = new Error(`Rate limited: ${status}`);
                lastError.status = status;
                continue; // Will retry after backoff
              }

              if (RETRYABLE_CODES.includes(status)) {
                log.warn(
                  'Scraping',
                  `${taskId}: Retryable error (${status}) via Puppeteer. Will retry.`,
                );
                lastError = new Error(`HTTP ${status}`);
                lastError.status = status;
                continue; // Will retry after backoff
              }

              // Handle 404 specifically - skip without treating as error
              if (status === 404) {
                log.verbose(`${taskId}: HTTP 404 via Puppeteer, skipping page.`);
                this.stats.failed += 1;
                return; // Exit the queue task entirely
              }

              html = await page.content();
              log.verbose(`${taskId}: Puppeteer fetch successful (status: ${status}).`);
              break; // Exit retry loop on success
            } catch (err) {
              lastError = err;
              const isTimeout = err.message.includes('timeout') || err.message.includes('Timeout');
              const isNetworkError = err.message.includes('net::') || err.message.includes('Navigation failed');

              log.warn(
                'Scraping',
                `${taskId}: Puppeteer ${isTimeout ? 'timeout' : 'error'}: ${err.message}. Will retry.`,
              );

              if (!isTimeout && !isNetworkError) {
                // Unknown error, don't retry
                throw err;
              }
              // Will retry after backoff
            } finally {
              if (page && !page.isClosed()) {
                await page.close();
              }
            }
          }

          // If we exhausted retries, throw the last error
          if (!html) {
            log.error(
              'Scraping',
              `${taskId}: All ${this.retryCount} Puppeteer retries exhausted.`,
            );
            throw lastError || new Error('Max retries exceeded');
          }

          // Check for 404-like content from puppeteer
          if (is404Content(html)) {
            log.verbose(
              `${taskId}: Detected 404-like content (puppeteer), skipping.`,
            );
            this.stats.failed += 1;
            return;
          }
        } else {
          log.verbose(`${taskId}: Using axios.`);

          // Retry loop with exponential backoff
          let lastError = null;
          for (let attempt = 0; attempt <= this.retryCount; attempt++) {
            try {
              if (attempt > 0) {
                const delay = getBackoffDelay(attempt - 1, this.retryDelay);
                log.info(
                  'Scraping',
                  `${taskId}: Retry ${attempt}/${this.retryCount} after ${Math.round(delay)}ms delay`,
                );
                this.emit('progress', {
                  type: 'retry',
                  url,
                  attempt,
                  maxRetries: this.retryCount,
                  delay: Math.round(delay),
                });
                await sleep(delay);
              }

              const response = await axios.get(url, {
                timeout: 60000,
                headers: {
                  'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                },
                // Accept all status codes to handle retries ourselves
                validateStatus: () => true,
              });

              const { status } = response;

              // Check for rate limiting
              if (RATE_LIMIT_CODES.includes(status)) {
                const retryAfter = response.headers['retry-after'];
                const waitTime = retryAfter
                  ? parseInt(retryAfter, 10) * 1000
                  : getBackoffDelay(attempt, this.retryDelay);
                log.warn(
                  'Scraping',
                  `${taskId}: Rate limited (${status}). Waiting ${Math.round(waitTime / 1000)}s before retry.`,
                );
                this.emit('progress', {
                  type: 'rate_limited',
                  url,
                  status,
                  waitTime,
                  retryAfter: retryAfter || null,
                });
                lastError = new Error(`Rate limited: ${status}`);
                lastError.status = status;
                continue; // Will retry after backoff
              }

              // Check for other retryable errors
              if (RETRYABLE_CODES.includes(status)) {
                log.warn(
                  'Scraping',
                  `${taskId}: Retryable error (${status}). Will retry.`,
                );
                lastError = new Error(`HTTP ${status}`);
                lastError.status = status;
                continue; // Will retry after backoff
              }

              // Handle 404 specifically - skip without treating as error
              if (status === 404) {
                log.verbose(`${taskId}: HTTP 404, skipping page.`);
                this.stats.failed += 1;
                return; // Exit the queue task entirely
              }

              // Non-retryable client errors (4xx except 429, 408, 404)
              if (status >= 400 && status < 500) {
                log.verbose(
                  `${taskId}: Client error (${status}), not retrying.`,
                );
                throw new Error(`HTTP ${status}: ${response.statusText}`);
              }

              // Success!
              html = response.data;
              log.verbose(
                `${taskId}: Axios fetch successful (status: ${status}).`,
              );
              break; // Exit retry loop on success
            } catch (axiosError) {
              // Network errors, timeouts, etc.
              lastError = axiosError;
              const isTimeout =
                axiosError.code === 'ECONNABORTED' ||
                axiosError.code === 'ETIMEDOUT';
              const isNetworkError =
                axiosError.code === 'ECONNREFUSED' ||
                axiosError.code === 'ENOTFOUND' ||
                axiosError.code === 'ECONNRESET';

              if (isTimeout || isNetworkError) {
                log.warn(
                  'Scraping',
                  `${taskId}: ${isTimeout ? 'Timeout' : 'Network error'} (${axiosError.code}). Will retry.`,
                );
                continue; // Will retry after backoff
              }

              // Unknown error, don't retry
              throw axiosError;
            }
          }

          // If we exhausted retries, throw the last error
          if (!html) {
            log.error(
              'Scraping',
              `${taskId}: All ${this.retryCount} retries exhausted.`,
            );
            throw lastError || new Error('Max retries exceeded');
          }
        }

        // Check for 404-like content (soft 404s that return 200)
        if (is404Content(html)) {
          log.verbose(`${taskId}: Detected 404-like content, skipping.`);
          this.stats.failed += 1;
          return;
        }

        log.verbose(`${taskId}: Loading content into cheerio...`);
        const $ = cheerio.load(html);

        log.verbose(`${taskId}: Extracting links...`);
        const newUrls = this.extractLinks($, url);
        log.verbose(`${taskId}: Found ${newUrls.length} links.`);

        if (!this.hasReachedMaxPages()) {
          log.verbose(
            `${taskId}: Adding ${newUrls.length} new URLs to queue...`,
          );
          newUrls.forEach((newUrl) => {
            this.addToQueue(newUrl, browser);
          });
        } else {
          log.verbose(
            `${taskId}: Max pages reached, not adding extracted links.`,
          );
        }

        if (this.signal?.aborted) throw new Error('Scrape aborted');

        log.verbose(`${taskId}: Processing page content...`);
        await this.processPage(url, $);
        log.verbose(`${taskId}: Page content processed.`);

        this.visitedUrls.add(url);
        this.stats.processed += 1;
        log.verbose(
          `${taskId}: Marked as visited. Processed count: ${this.stats.processed}`,
        );
      } catch (error) {
        log.verbose(`${taskId}: Error caught - ${error.message}`);
        log.verbose(`Error processing ${url}: ${error.message}`);
        log.error('Scraping', `Failed to process ${url}: ${error.message}`);
        this.stats.failed += 1;
      } finally {
        // This block MUST execute to ensure the task is removed from the inProgress set
        this.inProgressUrls.delete(url);
        log.verbose(
          `${taskId}: Finished execution (finally block). InProgress size: ${this.inProgressUrls.size}`,
        );
      }
    });
    log.verbose(
      `Added task for ${url}. Queue Size: ${this.queue.size}, Pending: ${this.queue.pending}`,
    );
    return true;
  }

  /**
   * Estimate token count for text (approximation: ~4 chars per token)
   * @param {string} text - Text to count tokens for
   * @returns {number} Estimated token count
   */
  estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
  }

  /**
   * Process a page - extract content and convert to markdown
   * @param {string} url - The URL of the page
   * @param {CheerioStatic} $ - Cheerio instance with loaded HTML
   */
  async processPage(url, $) {
    // Get raw HTML size for token tracking
    const rawHtml = $.html() || '';
    this.stats.rawHtmlTokens += this.estimateTokens(rawHtml);

    try {
      const article = await extract(url);

      if (article && article.content) {
        let markdown;
        try {
          // Preprocess HTML to handle MkDocs/Material code blocks before Turndown
          const preprocessedHtml = preprocessHtmlForCodeBlocks(article.content);
          markdown = this.turndownService.turndown(preprocessedHtml);
        } catch (turndownError) {
          // GFM plugin can fail on malformed tables - fall back to basic conversion
          log.verbose(`Turndown conversion failed for ${url}: ${turndownError.message}`);
          const basicTurndown = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced',
          });
          const preprocessedHtml = preprocessHtmlForCodeBlocks(article.content);
          markdown = basicTurndown.turndown(preprocessedHtml);
        }

        markdown = this.cleanupMarkdown(markdown);

        // Track markdown tokens
        this.stats.markdownTokens += this.estimateTokens(markdown);

        await this.saveMarkdown(url, markdown, this.libraryInfo);
        return;
      }
    } catch (error) {
      // Intentionally empty - falls back to basic content extraction below
    }

    const content = $('body');

    this.excludeSelectors.forEach((selector) => {
      $(selector, content).remove();
    });

    let markdown;
    try {
      // Preprocess HTML to handle MkDocs/Material code blocks before Turndown
      const preprocessedHtml = preprocessHtmlForCodeBlocks(content.html() || '');
      markdown = this.turndownService.turndown(preprocessedHtml);
    } catch (turndownError) {
      // GFM plugin can fail on malformed tables - fall back to basic conversion
      log.verbose(`Turndown conversion failed for ${url}: ${turndownError.message}`);
      // Create a fresh turndown instance without GFM for this page
      const basicTurndown = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
      });
      const preprocessedHtml = preprocessHtmlForCodeBlocks(content.html() || '');
      markdown = basicTurndown.turndown(preprocessedHtml);
    }

    markdown = this.cleanupMarkdown(markdown);

    // Track markdown tokens
    this.stats.markdownTokens += this.estimateTokens(markdown);

    await this.saveMarkdown(url, markdown, this.libraryInfo);
  }

  /**
   * Preprocess a URL to determine if it should be added to the queue
   * @param {string} url - The URL to process
   * @returns {string|null} - Normalized URL or null if rejected
   */
  preprocessUrl(url) {
    try {
      const urlObj = new URL(url);

      urlObj.hash = '';

      if (!this.allowedDomains.includes(urlObj.hostname)) {
        return null;
      }

      if (this.enforceBasePath) {
        const urlString = urlObj.toString();
        if (!urlString.startsWith(this.basePath)) {
          log.verbose(
            `Skipping URL ${urlString} - doesn't start with enforced base path ${this.basePath}`,
          );
          return null;
        }
      }

      const pathName = urlObj.pathname.toLowerCase();
      if (
        this.urlBlacklist.some((pattern) =>
          pathName.includes(pattern.toLowerCase()),
        )
      ) {
        return null;
      }

      const fileExtensions = [
        '.pdf',
        '.zip',
        '.tar.gz',
        '.tgz',
        '.exe',
        '.dmg',
        '.pkg',
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.svg',
        '.mp4',
        '.webm',
        '.mp3',
        '.wav',
      ];
      if (fileExtensions.some((ext) => pathName.endsWith(ext))) {
        return null;
      }

      if (urlObj.search) {
        const params = new URLSearchParams(urlObj.search);
        const newParams = new URLSearchParams();

        this.queryParamsToKeep.forEach((param) => {
          if (params.has(param)) {
            newParams.set(param, params.get(param));
          }
        });

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

        hasPaginationOrSorting = [...paginationParams, ...sortingParams].some(
          (param) => params.has(param),
        );

        hasContentParams = this.queryParamsToKeep.some((param) =>
          params.has(param),
        );

        if (hasPaginationOrSorting && !hasContentParams) {
          const page =
            params.get('page') || params.get('p') || params.get('pg') || '1';
          if (page !== '1') {
            return null;
          }
        }
      }

      const pathSegments = urlObj.pathname.split('/').filter(Boolean);
      if (pathSegments.length > urlFiltering.depthNumberOfSegments) {
        const docPatterns = urlFiltering.depthSegmentCheck;
        let isDocPath = false;

        isDocPath = docPatterns.some((pattern) =>
          urlObj.pathname.includes(pattern),
        );

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
      const href = $(el).attr('href');

      if (!href || href.startsWith('#') || href === '#') {
        return;
      }

      try {
        const url = new URL(href, baseUrl);

        const normalizedUrl = this.preprocessUrl(url.toString());

        if (!normalizedUrl) {
          return;
        }

        if (
          !this.visitedUrls.has(normalizedUrl) &&
          !this.inProgressUrls.has(normalizedUrl) &&
          !this.queuedUrls.has(normalizedUrl)
        ) {
          newUrls.push(normalizedUrl);
        }
      } catch (error) {
        if (
          error instanceof TypeError &&
          error.message.includes('Invalid URL')
        ) {
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
    const filename = DocsToMarkdown.getFilenameForUrl(url);

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
      url,
      outputPath,
      processed: this.visitedUrls.size,
      total: this.maxPages > 0 ? this.maxPages : this.getTotalPageCount(),
      progress:
        this.maxPages > 0
          ? Math.floor((this.visitedUrls.size / this.maxPages) * 100)
          : Math.floor(
              (this.visitedUrls.size / this.getTotalPageCount()) * 100,
            ),
    });
  }
}

export default DocsToMarkdown;
