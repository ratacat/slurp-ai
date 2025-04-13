import path from 'path';
import fs from 'fs-extra';
import { URL } from 'url';
import DocumentationScraper from './DocumentationScraper.js';
import { MarkdownCompiler } from './MarkdownCompiler.js';
import { log } from './utils/logger.js';
import config, { paths, scraping, urlFiltering } from '../config.js';

/**
 * Extracts a base name from a URL, suitable for filenames/directory names.
 * @param {string} url - The URL to extract the name from.
 * @returns {string} A sanitized name derived from the URL.
 */
function extractNameFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/').filter(Boolean);

    if (pathSegments.length > 0) {
      for (let i = pathSegments.length - 1; i >= 0; i--) {
        const segment = pathSegments[i].replace(/\.[^/.]+$/, "");
        if (!['docs', 'documentation', 'api', 'reference', 'guide', 'introduction', 'index', ''].includes(segment.toLowerCase())) {
          return segment
            .replace(/\$/g, 's')
            .replace(/[^a-z0-9-]/gi, '');
        }
      }
      return (pathSegments[pathSegments.length - 1] || 'index')
        .replace(/\$/g, 's')
        .replace(/[^a-z0-9-]/gi, '');
    }

    const hostParts = urlObj.hostname.split('.');
    
    const commonTLDs = ['com', 'org', 'net', 'io', 'dev'];
    const commonCCTLDs = ['co.uk', 'com.au', 'co.nz', 'org.uk'];
    
    let domain = urlObj.hostname;
    
    for (const tld of commonTLDs) {
      if (domain.endsWith(`.${tld}`)) {
        domain = domain.slice(0, -(tld.length + 1));
        break;
      }
    }
    
    for (const cctld of commonCCTLDs) {
      if (domain.endsWith(`.${cctld}`)) {
        domain = domain.slice(0, -(cctld.length + 1));
        break;
      }
    }
    
    if (domain.includes('.')) {
      const parts = domain.split('.');
      domain = parts[parts.length - 1];
    }
    
    return domain
      .replace(/\$/g, 's')
      .replace(/[^a-z0-9-]/gi, '');
  } catch (error) {
    log.warn('Workflow', `Failed to extract name from URL "${url}": ${error.message}`);
    return `doc-${Date.now()}`;
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

    // --- Determine Paths ---
    const siteName = extractNameFromUrl(url);
    const version = options.version;

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
    const outputFilename = `${siteName}${version ? `_${version}` : ''}_docs.md`;
    const finalCompiledPath = path.join(absoluteCompiledDir, outputFilename);

    await fs.ensureDir(structuredPartialsDir);
    await fs.ensureDir(absoluteCompiledDir);

    log.verbose(`Partials directory: ${structuredPartialsDir}`);
    log.verbose(`Compiled output path: ${finalCompiledPath}`);

    // --- Configure Scraper ---
    const scrapeConfig = {
      baseUrl: url,
      basePath: options.basePath || url,
      enforceBasePath: options.basePath !== undefined || urlFiltering.enforceBasePath,
      outputDir: structuredPartialsDir,
      maxPages: options.maxPages ?? scraping.maxPagesPerSite,
      useHeadless: options.useHeadless ?? !scraping.useHeadless,
      libraryInfo: {
        library: siteName,
        version: version || '',
        sourceType: 'url'
      },
      contentSelector: 'main, .content, .document, article, .documentation, .main-content',
       excludeSelectors: [
         'nav', '.navigation', '.sidebar', '.menu', '.toc',
         'footer', '.footer', 'script', 'style', '.headerlink'
       ],
      allowedDomains: [urlObj.hostname],
      concurrency: options.concurrency ?? scraping.concurrency,
      retryCount: options.retryCount ?? scraping.retryCount,
      retryDelay: options.retryDelay ?? 1000,
      getFilenameForUrl: function(pageUrl) {
         try {
           const pageUrlObj = new URL(pageUrl);
           const pagePath = pageUrlObj.pathname;
           if (pagePath === '/' || pagePath === '') return 'index.md';
           const segments = pagePath.replace(/^\/|\/$/g, '').split('/');
           let currentDir = this.outputDir;
           for (let i = 0; i < segments.length - 1; i++) {
             currentDir = path.join(currentDir, segments[i].replace(/[^a-z0-9_-]/gi, '_'));
             fs.ensureDirSync(currentDir);
           }
           const lastSegment = segments[segments.length - 1] || 'index';
           const filename = lastSegment.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9_-]/gi, '_') + '.md';
           const relativePath = segments.slice(0, -1).map(s => s.replace(/[^a-z0-9_-]/gi, '_')).join(path.sep);
           return relativePath ? path.join(relativePath, filename) : filename;
         } catch (error) {
           log.warn('Workflow', `Error generating filename for ${pageUrl}: ${error.message}`);
           return `page-${Date.now()}.md`;
         }
       },
       signal: options.signal
    };

    log.verbose(`Base path config: baseUrl=${scrapeConfig.baseUrl}, basePath=${scrapeConfig.basePath}, enforceBasePath=${scrapeConfig.enforceBasePath}`);

    scraper = new DocumentationScraper(scrapeConfig);

    // --- Run Scraper ---
    log.start('Scraping', `Starting... (Concurrency: ${scrapeConfig.concurrency})`);
    
    let processedCount = 0;
    
    progressCallback = (data) => {
        if (data.type === 'processing') {
            processedCount++;
            if (options.onProgress) {
                options.onProgress(processedCount, undefined, `Scraping page ${processedCount}...`);
            }
            if (processedCount % 10 === 0 || processedCount === 1) {
                log.progress(`Scraping page ${processedCount}/?...`);
            }
        } else if (data.type === 'failed') {
            log.warn('Scraping', `Failed to scrape: ${data.url} - ${data.error}`);
        }
    };
    
    scraper.on('progress', progressCallback);
    
    // Export the progressCallback for testing
    if (process.env.NODE_ENV === 'test') {
        runSlurpWorkflow.testProgressCallback = progressCallback;
    }

    const scrapeStats = await scraper.start();
    log.success('Scraping', `Finished. Processed: ${scrapeStats.processed} pages, Failed: ${scrapeStats.failed} pages (${scrapeStats.duration.toFixed(1)}s)`);

    if (scrapeStats.processed === 0) {
        throw new Error("Scraping completed, but no pages were successfully processed. Cannot compile.");
    }

    // --- Configure Compiler ---
    const compileOptions = {
      inputDir: structuredPartialsDir,
      outputFile: finalCompiledPath,
      preserveMetadata: options.preserveMetadata ?? config.compilation.preserveMetadata,
      removeNavigation: options.removeNavigation ?? config.compilation.removeNavigation,
      removeDuplicates: options.removeDuplicates ?? config.compilation.removeDuplicates,
    };

    const compiler = new MarkdownCompiler(compileOptions);

    // --- Run Compiler ---
    log.start('Compiling', `Processing partials from ${path.relative(process.cwd(), structuredPartialsDir)}...`);
    const compileResult = await compiler.compile();
    log.success('Compiling', `Finished. Output: ${path.relative(process.cwd(), compileResult.outputFile)} (${compileResult.stats.processedFiles} files processed)`);
    log.verbose(`Compiler Stats: ${JSON.stringify(compileResult.stats)}`);

    if (compileResult.stats.processedFiles === 0) {
        log.warn('Compiling', "Compilation finished, but no files were processed.");
    }

     // --- Cleanup Partials ---
     const shouldDeletePartials = options.deletePartials ?? true;
     if (shouldDeletePartials && compileResult.stats.processedFiles > 0) {
       log.start('Cleanup', `Deleting partials directory: ${path.relative(process.cwd(), structuredPartialsDir)}...`);
       await fs.remove(structuredPartialsDir);
       log.verbose(`Partials directory deleted.`);
     } else if (shouldDeletePartials) {
         log.verbose(`Skipping partials deletion as no files were compiled.`);
     }

    // --- Final Success Message ---
    log.final(`Slurp complete! Final output: ${path.relative(process.cwd(), finalCompiledPath)}`);

    // --- Return Success ---
    return {
      success: true,
      compiledFilePath: path.relative(process.cwd(), finalCompiledPath)
    };

  } catch (error) {
    log.error('Workflow', `Slurp workflow failed: ${error.message}`);
    if (error.stack) {
        log.verbose(error.stack);
    }
    
    if (error.message.startsWith('Invalid URL provided:')) {
        throw error;
    }
    
    if (structuredPartialsDir && (options.deletePartials ?? true)) {
        try {
            log.verbose(`Attempting cleanup of partials directory on error: ${structuredPartialsDir}`);
            await fs.remove(structuredPartialsDir);
            log.verbose(`Partials directory deleted during error cleanup.`);
        } catch (cleanupError) {
            log.warn('Cleanup', `Failed to cleanup partials directory during error handling: ${cleanupError.message}`);
        }
    }
    return { success: false, error: error };
  }
}
export { runSlurpWorkflow, extractNameFromUrl };