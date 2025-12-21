import path from 'path';
import fs from 'fs-extra';
import { URL } from 'url';
import DocumentationScraper from './DocumentationScraper.js';
import { MarkdownCompiler } from './MarkdownCompiler.js';
import { log } from './utils/logger.js';
import { fetchSitemap, ProgressEstimator } from './utils/sitemap.js';
import { paths, scraping, urlFiltering, compilation } from '../config.js';

/**
 * Attempts to detect a version string from a URL.
 * Looks for common version patterns in paths and query strings.
 *
 * Examples:
 *   https://docs.python.org/3.11/library → "3.11"
 *   https://react.dev/v18/api → "v18"
 *   https://example.com/docs?version=2.0.0 → "2.0.0"
 *   https://lodash.com/docs/4.17.15 → "4.17.15"
 *
 * @param {string} url - The URL to extract version from.
 * @returns {string|null} Detected version string or null.
 */
function detectVersionFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const searchParams = urlObj.searchParams;

    // Check query params first
    const versionParam =
      searchParams.get('version') ||
      searchParams.get('v') ||
      searchParams.get('ver');
    if (versionParam) {
      return versionParam;
    }

    // Common URL path patterns for versions
    const versionPatterns = [
      // /v1/, /v2/, /v18/
      /\/v(\d+(?:\.\d+)*)\/?/i,
      // /3.11/, /4.17.15/
      /\/(\d+\.\d+(?:\.\d+)?)\/?/,
      // /@1.2.3/, /@latest/
      /@(\d+\.\d+(?:\.\d+)?|latest|next|stable)\/?/i,
      // /version-1.2.3/
      /\/version[_-]?(\d+(?:\.\d+)*)\/?/i,
      // /docs-v2/
      /\/docs[_-]v(\d+(?:\.\d+)*)\/?/i,
    ];

    for (const pattern of versionPatterns) {
      const match = pathname.match(pattern);
      if (match) {
        // Return with 'v' prefix if it's just a major version number
        const ver = match[1];
        if (/^\d+$/.test(ver)) {
          return `v${ver}`;
        }
        return ver;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Extracts a base name from a URL, suitable for filenames.
 * Uses domain name, adding "-docs" suffix if subdomain is "docs" or path starts with /docs.
 *
 * Examples:
 *   https://react.dev/reference → "react"
 *   https://docs.anthropic.com/en/docs → "anthropic-docs"
 *   https://docs.python.org/3/library → "python-docs"
 *   https://platform.claude.com/docs → "claude-platform-docs"
 *   https://code.claude.com/docs → "claude-code-docs"
 *   https://flask.palletsprojects.com/quickstart → "palletsprojects-flask"
 *
 * @param {string} url - The URL to extract the name from.
 * @returns {string} A sanitized name derived from the URL.
 */
function extractNameFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    // Check if subdomain is "docs"
    const hasDocsSubdomain = hostname.startsWith('docs.');
    
    // Common TLDs to strip
    const tlds = [
      // Country-code second-level domains (must check first - longer matches)
      '.co.uk', '.com.au', '.co.nz', '.org.uk', '.co.jp',
      // Common TLDs
      '.com', '.org', '.net', '.io', '.dev', '.ai', '.app', '.sh',
    ];
    
    let domain = hostname;
    
    // Strip "docs." subdomain if present
    if (hasDocsSubdomain) {
      domain = domain.slice(5); // Remove "docs."
    }
    
    // Strip TLD
    for (const tld of tlds) {
      if (domain.endsWith(tld)) {
        domain = domain.slice(0, -tld.length);
        break;
      }
    }
    
    // Handle multiple subdomain parts (e.g., "platform.claude" → "claude-platform")
    if (domain.includes('.')) {
      const parts = domain.split('.');
      // Reverse order: subdomain.brand → brand-subdomain
      // e.g., platform.claude → claude-platform
      domain = parts.reverse().join('-');
    }

    // Sanitize: keep only alphanumeric and hyphens
    domain = domain.replace(/[^a-z0-9-]/gi, '').toLowerCase();

    // Add "-docs" suffix if the original had a docs subdomain
    if (hasDocsSubdomain) {
      domain = `${domain}-docs`;
    }

    // Also add "-docs" suffix if the URL path starts with /docs (and we don't already have it)
    const pathname = urlObj.pathname.toLowerCase();
    if (pathname.startsWith('/docs') && !domain.endsWith('-docs')) {
      domain = `${domain}-docs`;
    }
    
    return domain || `site-${Date.now()}`;
  } catch (error) {
    log.warn(
      'Workflow',
      `Failed to extract name from URL "${url}": ${error.message}`,
    );
    return `site-${Date.now()}`;
  }
}

/**
 * Runs the complete Slurp workflow: scrape documentation from a URL and compile it.
 * @param {string} url - The starting URL to scrape.
 * @param {object} [options={}] - Configuration options.
 * @param {string} [options.version] - Optional version string to include in paths.
 * @param {string} [options.basePath] - URL prefix required for scraped links (if SLURP_ENFORCE_BASE_PATH=true). Defaults to the start URL if omitted.
 * @param {string} [options.partialsOutputDir] - Base directory for intermediate partial files. Defaults to env SLURP_PARTIALS_DIR or './slurp_partials'.
 * @param {string} [options.compiledOutputDir] - Directory for the final compiled file. Defaults to env SLURP_COMPILED_DIR or './compiled'.
 * @param {number} [options.maxPages=20] - Maximum pages to scrape. Defaults to env SLURP_MAX_PAGES_PER_SITE or 20.
 * @param {boolean} [options.useHeadless=true] - Whether to use a headless browser. Defaults to true.
 * @param {number} [options.concurrency=10] - Number of concurrent scraping requests. Defaults to env SLURP_CONCURRENCY or 10.
 * @param {number} [options.retryCount=3] - Number of retries for failed requests. Defaults to 3.
 * @param {number} [options.retryDelay=1000] - Delay between retries in ms. Defaults to 1000.
 * @param {boolean} [options.preserveMetadata=true] - Keep metadata in compiled output. Defaults to env SLURP_PRESERVE_METADATA or true.
 * @param {boolean} [options.removeNavigation=true] - Remove navigation elements during compilation. Defaults to env SLURP_REMOVE_NAVIGATION or true.
 * @param {boolean} [options.removeDuplicates=true] - Remove duplicate content during compilation. Defaults to env SLURP_REMOVE_DUPLICATES or true.
 * @param {boolean} [options.deletePartials=true] - Delete partials directory after successful compilation. Defaults to env SLURP_DELETE_PARTIALS or true.
 * @param {function(progress: number, total?: number, message?: string): void} [options.onProgress] - Optional callback for progress updates.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to allow cancellation.
 * @returns {Promise<{success: boolean, compiledFilePath?: string, error?: Error}>} - Result object indicating success or failure.
 * @async
 */
async function runSlurpWorkflow(url, options = {}) {
  let scraper;
  let structuredPartialsDir;
  let progressCallback;

  try {
    // --- Validate URL ---
    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (e) {
      log.error('Workflow', `Invalid URL provided: ${url}`);
      throw new Error(`Invalid URL provided: ${url}`);
    }

    // --- Print header ---
    log.header(url);

    // --- Determine Paths ---
    const siteName = extractNameFromUrl(url);
    const { version } = options;

    const basePartialsDir = options.partialsOutputDir || paths.inputDir;
    const compiledOutputDir = options.compiledOutputDir || paths.outputDir;

    const absolutePartialsDir = path.isAbsolute(basePartialsDir)
      ? basePartialsDir
      : path.join(process.cwd(), basePartialsDir);

    structuredPartialsDir = path.join(absolutePartialsDir, siteName);
    if (version) {
      structuredPartialsDir = path.join(structuredPartialsDir, version);
    }

    const absoluteCompiledDir = path.isAbsolute(compiledOutputDir)
      ? compiledOutputDir
      : path.join(process.cwd(), compiledOutputDir);
    const outputFilename = `${siteName}${version ? `_${version}` : ''}.md`;
    const finalCompiledPath = path.join(absoluteCompiledDir, outputFilename);

    await fs.ensureDir(structuredPartialsDir);
    await fs.ensureDir(absoluteCompiledDir);

    log.verbose(`Partials directory: ${structuredPartialsDir}`);
    log.verbose(`Compiled output path: ${finalCompiledPath}`);

    // --- Configure Scraper ---
    const scrapeConfig = {
      baseUrl: url,
      basePath: options.basePath || url,
      enforceBasePath:
        options.basePath !== undefined || urlFiltering.enforceBasePath,
      outputDir: structuredPartialsDir,
      maxPages: options.maxPages ?? scraping.maxPagesPerSite,
      useHeadless: options.useHeadless ?? !scraping.useHeadless,
      libraryInfo: {
        library: siteName,
        version: version || '',
        sourceType: 'url',
      },
      contentSelector:
        'main, .content, .document, article, .documentation, .main-content',
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
        '.headerlink',
      ],
      allowedDomains: [urlObj.hostname],
      concurrency: options.concurrency ?? scraping.concurrency,
      retryCount: options.retryCount ?? scraping.retryCount,
      retryDelay: options.retryDelay ?? 1000,
      getFilenameForUrl(pageUrl) {
        try {
          const pageUrlObj = new URL(pageUrl);
          const pagePath = pageUrlObj.pathname;
          if (pagePath === '/' || pagePath === '') return 'index.md';
          const segments = pagePath.replace(/^\/|\/$/g, '').split('/');
          let currentDir = this.outputDir;
          for (let i = 0; i < segments.length - 1; i += 1) {
            currentDir = path.join(
              currentDir,
              segments[i].replace(/[^a-z0-9_-]/gi, '_'),
            );
            fs.ensureDirSync(currentDir);
          }
          const lastSegment = segments[segments.length - 1] || 'index';
          const filename = `${lastSegment
            .replace(/\.[^/.]+$/, '')
            .replace(/[^a-z0-9_-]/gi, '_')}.md`;
          const relativePath = segments
            .slice(0, -1)
            .map((s) => s.replace(/[^a-z0-9_-]/gi, '_'))
            .join(path.sep);
          return relativePath ? path.join(relativePath, filename) : filename;
        } catch (error) {
          log.warn(
            'Workflow',
            `Error generating filename for ${pageUrl}: ${error.message}`,
          );
          return `page-${Date.now()}.md`;
        }
      },
      signal: options.signal,
    };

    log.verbose(
      `Base path config: baseUrl=${scrapeConfig.baseUrl}, basePath=${scrapeConfig.basePath}, enforceBasePath=${scrapeConfig.enforceBasePath}`,
    );

    scraper = new DocumentationScraper(scrapeConfig);

    // --- Check for Sitemap ---
    log.spinnerStart('Scraping', 'checking sitemap...');
    log.spinnerLog('Looking for sitemap.xml...');

    const estimator = new ProgressEstimator();
    estimator.start();

    // Try to get page count from sitemap
    const basePath = scrapeConfig.basePath || url;
    const sitemapResult = await fetchSitemap(url, new URL(basePath).pathname);

    if (sitemapResult.found && sitemapResult.count > 0) {
      const sitemapCount = sitemapResult.count;
      const maxPages = scrapeConfig.maxPages || sitemapCount;
      const effectiveCount = Math.min(sitemapCount, maxPages);

      estimator.setSitemapEstimate(effectiveCount);

      if (sitemapCount > maxPages) {
        log.spinnerLog(`Sitemap: ${sitemapCount} pages (limiting to ${maxPages})`);
      } else {
        log.spinnerLog(`Sitemap: ${sitemapCount} pages`);
      }
      log.spinnerSetProgress(0, effectiveCount);
    } else {
      log.spinnerLog('No sitemap, estimating as we go...');
    }

    // --- Run Scraper ---
    log.spinnerLog('Initializing browser...');

    let processedCount = 0;
    let inFlightCount = 0;
    let pageStartTimes = new Map();

    progressCallback = (data) => {
      if (data.type === 'processing') {
        inFlightCount = data.inProgress || 0;
        pageStartTimes.set(data.url, Date.now());

        // Track discovered URLs for estimation
        estimator.addDiscoveredUrl(data.url);
      } else if (data.type === 'saved') {
        // Calculate how long this page took
        const startTime = pageStartTimes.get(data.url) || Date.now();
        const duration = Date.now() - startTime;
        pageStartTimes.delete(data.url);

        // Update estimator
        estimator.recordCompletion(duration);
        processedCount += 1;

        // Update progress bar with actual progress
        const progress = estimator.getProgress();
        const estimatedTotal = estimator.estimatedTotal;
        log.spinnerSetProgress(progress, estimatedTotal);

        if (options.onProgress) {
          options.onProgress(
            processedCount,
            estimatedTotal,
            `Scraping page ${processedCount}...`,
          );
        }

        // Update spinner with current progress
        log.spinnerUpdate('Scraping', `${processedCount} pages`, {
          inFlight: inFlightCount,
        });

        // Log the page title (extracted from URL path)
        const urlPath = new URL(data.url).pathname;
        const pageName = urlPath
          .split('/')
          .filter(Boolean)
          .pop()
          ?.replace(/[-_]/g, ' ')
          .replace(/\.\w+$/, '') || 'index';

        // Capitalize first letter
        const title = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        log.spinnerLog(title);
      } else if (data.type === 'failed') {
        const pageName = data.url.split('/').pop() || 'page';
        log.spinnerLog(`✗ ${pageName}`);
        log.verbose(`Failed to scrape: ${data.url} - ${data.error}`);
      }
    };

    scraper.on('progress', progressCallback);

    // Export the progressCallback for testing
    if (process.env.NODE_ENV === 'test') {
      runSlurpWorkflow.testProgressCallback = progressCallback;
    }

    log.spinnerLog('Discovering linked pages...');
    const scrapeStats = await scraper.start();

    // Show scraping completion with stats (showHeader=true for first phase)
    log.spinnerSucceed('Scraping', {
      count: scrapeStats.processed,
      label: 'pages',
      duration: scrapeStats.duration,
      failed: scrapeStats.failed,
    }, true);

    if (scrapeStats.processed === 0) {
      throw new Error(
        'Scraping completed, but no pages were successfully processed. Cannot compile.',
      );
    }

    // --- Configure Compiler ---
    const compileOptions = {
      inputDir: structuredPartialsDir,
      outputFile: finalCompiledPath,
      preserveMetadata:
        options.preserveMetadata ?? compilation.preserveMetadata,
      removeNavigation:
        options.removeNavigation ?? compilation.removeNavigation,
      removeDuplicates:
        options.removeDuplicates ?? compilation.removeDuplicates,
    };

    const compiler = new MarkdownCompiler(compileOptions);

    // Detect version and set metadata
    const detectedVersion = version || detectVersionFromUrl(url);
    compiler.setMetadata({
      url,
      title: `${siteName} Documentation`,
      version: detectedVersion,
    });

    // --- Run Compiler ---
    log.spinnerStart('Compiling', 'processing files...');
    log.spinnerLog('Reading scraped markdown files...');
    log.spinnerLog('Extracting frontmatter metadata...');

    const compileResult = await compiler.compile();

    // Log compilation activities
    log.spinnerLog('Removing duplicate content sections...');
    log.spinnerLog('Stripping navigation elements...');
    log.spinnerLog('Consolidating into single document...');

    const relativeOutputPath = path.relative(
      process.cwd(),
      compileResult.outputFile,
    );

    log.spinnerSucceed('Compiling', {
      count: compileResult.stats.processedFiles,
      label: 'files',
      output: relativeOutputPath,
    });

    log.verbose(`Compiler Stats: ${JSON.stringify(compileResult.stats)}`);

    if (compileResult.stats.processedFiles === 0) {
      log.warn(
        'Compiling',
        'Compilation finished, but no files were processed.',
      );
    }

    // --- Cleanup Partials ---
    const shouldDeletePartials = options.deletePartials ?? true;
    if (shouldDeletePartials && compileResult.stats.processedFiles > 0) {
      log.verbose(`Deleting partials directory: ${structuredPartialsDir}`);
      await fs.remove(structuredPartialsDir);
      log.verbose(`Partials directory deleted.`);
    } else if (shouldDeletePartials) {
      log.verbose(`Skipping partials deletion as no files were compiled.`);
    }

    // --- Final Success Message ---
    // Combine scraper and compiler stats for full pipeline view
    const combinedStats = {
      ...compileResult.stats,
      rawHtmlTokens: scrapeStats.rawHtmlTokens || 0,
      scrapeMarkdownTokens: scrapeStats.markdownTokens || 0,
    };
    log.done(relativeOutputPath, compileResult.outputFile, combinedStats);

    // --- Return Success ---
    return {
      success: true,
      compiledFilePath: relativeOutputPath,
    };
  } catch (error) {
    // Stop any active spinner
    const spinner = log.getSpinner();
    if (spinner.isSpinning) {
      spinner.stop();
    }

    log.error('Workflow', `Slurp workflow failed: ${error.message}`);
    if (error.stack) {
      log.verbose(error.stack);
    }

    if (error.message.startsWith('Invalid URL provided:')) {
      throw error;
    }

    if (structuredPartialsDir && (options.deletePartials ?? true)) {
      try {
        log.verbose(
          `Attempting cleanup of partials directory on error: ${structuredPartialsDir}`,
        );
        await fs.remove(structuredPartialsDir);
        log.verbose(`Partials directory deleted during error cleanup.`);
      } catch (cleanupError) {
        log.warn(
          'Cleanup',
          `Failed to cleanup partials directory during error handling: ${cleanupError.message}`,
        );
      }
    }
    return { success: false, error };
  }
}
export { runSlurpWorkflow, extractNameFromUrl, detectVersionFromUrl };
