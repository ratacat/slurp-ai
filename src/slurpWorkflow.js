import path from 'path';
import fs from 'fs-extra';
import { URL } from 'url';
// Import the default export from DocumentationScraper.js
import DocumentationScraper from './DocumentationScraper.js';
import { MarkdownCompiler } from './MarkdownCompiler.js';
import { log } from './utils/logger.js';

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
        const segment = pathSegments[i].replace(/\.[^/.]+$/, ""); // Remove extension
        if (!['docs', 'documentation', 'api', 'reference', 'guide', 'introduction', 'index', ''].includes(segment.toLowerCase())) {
          return segment.replace(/[^a-z0-9_-]/gi, '_'); // Sanitize
        }
      }
      // If all segments are common, use the last one, sanitized
      return (pathSegments[pathSegments.length - 1] || 'index').replace(/[^a-z0-9_-]/gi, '_');
    }

    const hostParts = urlObj.hostname.split('.');
    if (hostParts.length >= 2) {
      const domain = hostParts[hostParts.length - 2];
      return domain.replace(/[^a-z0-9_-]/gi, '_'); // Sanitize
    }
    // Fallback to full hostname, sanitized
    return urlObj.hostname.replace(/[^a-z0-9_-]/gi, '_');
  } catch (error) {
    log.warn(`Failed to extract name from URL "${url}": ${error.message}`);
    return `doc-${Date.now()}`;
  }
}


/**
 * Runs the complete Slurp workflow: scrape documentation from a URL and compile it.
 * @param {string} url - The starting URL to scrape.
 * @param {object} [options={}] - Configuration options.
 * @param {string} [options.version] - Optional version string to include in paths.
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
  let scraper; // Define scraper here to access in catch block if needed
  let structuredPartialsDir; // Define here for access in finally/cleanup

  try {
    log.info(`Starting Slurp workflow for URL: ${url}`);

    // --- Validate URL ---
    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (e) {
      throw new Error(`Invalid URL provided: ${url}`);
    }

    // --- Determine Paths ---
    const siteName = extractNameFromUrl(url);
    const version = options.version; // Use version if provided in options

    const basePartialsDir = options.partialsOutputDir || process.env.SLURP_PARTIALS_DIR || path.join(process.cwd(), 'slurp_partials');
    structuredPartialsDir = path.join(basePartialsDir, siteName);
    if (version) {
      structuredPartialsDir = path.join(structuredPartialsDir, version);
    }

    const compiledOutputDir = options.compiledOutputDir || process.env.SLURP_COMPILED_DIR || path.join(process.cwd(), 'compiled');
    const outputFilename = `${siteName}${version ? `_${version}` : ''}_docs.md`;
    const finalCompiledPath = path.join(compiledOutputDir, outputFilename);

    await fs.ensureDir(structuredPartialsDir);
    await fs.ensureDir(compiledOutputDir);

    log.verbose(`Partials directory: ${structuredPartialsDir}`);
    log.verbose(`Compiled output path: ${finalCompiledPath}`);

    // --- Configure Scraper ---
    const scrapeConfig = {
      baseUrl: url,
      outputDir: structuredPartialsDir,
      maxPages: options.maxPages ?? parseInt(process.env.SLURP_MAX_PAGES_PER_SITE || '20', 10),
      useHeadless: options.useHeadless ?? true,
      libraryInfo: { // Minimal library info for context
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
      concurrency: options.concurrency ?? parseInt(process.env.SLURP_CONCURRENCY || '10', 10),
      retryCount: options.retryCount ?? 3,
      retryDelay: options.retryDelay ?? 1000,
      // Custom filename generator adapted from cli.js
      getFilenameForUrl: function(pageUrl) {
         try {
           const pageUrlObj = new URL(pageUrl);
           const pagePath = pageUrlObj.pathname;
           if (pagePath === '/' || pagePath === '') return 'index.md';
           const segments = pagePath.replace(/^\/|\/$/g, '').split('/');
           let currentDir = this.outputDir; // Use scraper's outputDir
           for (let i = 0; i < segments.length - 1; i++) {
             currentDir = path.join(currentDir, segments[i].replace(/[^a-z0-9_-]/gi, '_')); // Sanitize dir names
             fs.ensureDirSync(currentDir);
           }
           const lastSegment = segments[segments.length - 1] || 'index';
           const filename = lastSegment.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9_-]/gi, '_') + '.md'; // Sanitize filename
           const relativePath = segments.slice(0, -1).map(s => s.replace(/[^a-z0-9_-]/gi, '_')).join(path.sep); // Sanitize relative path parts
           return relativePath ? path.join(relativePath, filename) : filename;
         } catch (error) {
           log.warn(`Error generating filename for ${pageUrl}: ${error.message}`);
           return `page-${Date.now()}.md`;
         }
       },
      signal: options.signal // Pass the signal to the scraper config
    };

    scraper = new DocumentationScraper(scrapeConfig);

    // --- Run Scraper ---
    log.info(`Scraping starting from ${url}...`);
    // Minimal progress logging
    let processedCount = 0;
    scraper.on('progress', (data) => {
        if (data.type === 'processing') {
            processedCount++;
            // Call the progress callback if provided
            if (options.onProgress) {
              // We don't know the total pages easily, so omit 'total' for now
              options.onProgress(processedCount, undefined, `Scraping page ${processedCount}...`);
            }
            if (processedCount % 10 === 0 || processedCount === 1) { // Log every 10 pages
                 log.verbose(`Scraping progress: ${processedCount} pages processed...`);
            }
        } else if (data.type === 'failed') {
            log.warn(`Failed to scrape: ${data.url} - ${data.error}`);
        }
    });

    const scrapeStats = await scraper.start(); // This promise resolves when scraping is done
    log.success(`Scraping finished. Processed: ${scrapeStats.processed}, Failed: ${scrapeStats.failed}`);

    if (scrapeStats.processed === 0) {
        throw new Error("Scraping completed, but no pages were successfully processed. Cannot compile.");
    }

    // --- Configure Compiler ---
    const compileOptions = {
      inputDir: structuredPartialsDir,
      outputFile: finalCompiledPath,
      // outputName: siteName, // outputName seems less relevant now we have outputFile
      preserveMetadata: options.preserveMetadata ?? (process.env.SLURP_PRESERVE_METADATA !== 'false'),
      removeNavigation: options.removeNavigation ?? (process.env.SLURP_REMOVE_NAVIGATION !== 'false'),
      removeDuplicates: options.removeDuplicates ?? (process.env.SLURP_REMOVE_DUPLICATES !== 'false'),
      // excludePatterns can be passed via options if needed, but omitted for simplicity now
    };

    const compiler = new MarkdownCompiler(compileOptions);

    // --- Run Compiler ---
    log.info(`Compiling partials from ${structuredPartialsDir}...`);
    const compileResult = await compiler.compile();
    log.success(`Compilation complete! Output: ${path.relative(process.cwd(), compileResult.outputFile)}`);
    log.verbose(`Compiler Stats: ${JSON.stringify(compileResult.stats)}`);

    if (compileResult.stats.processedFiles === 0) {
        log.warn("Compilation finished, but no files were processed from the partials directory.");
        // Decide if this is an error or just a warning. Let's treat it as success for now, but log clearly.
    }

     // --- Cleanup Partials ---
     const shouldDeletePartials = options.deletePartials ?? (process.env.SLURP_DELETE_PARTIALS !== 'false');
     if (shouldDeletePartials && compileResult.stats.processedFiles > 0) {
       log.verbose(`Deleting partials directory: ${structuredPartialsDir}`);
       await fs.remove(structuredPartialsDir);
       log.verbose(`Partials directory deleted.`);
     } else if (shouldDeletePartials) {
         log.verbose(`Skipping partials deletion as no files were compiled.`);
     }


    // --- Return Success ---
    return {
      success: true,
      compiledFilePath: path.relative(process.cwd(), finalCompiledPath) // Return relative path
    };

  } catch (error) {
    log.error(`Slurp workflow failed: ${error.message}`);
    if (error.stack) {
        log.verbose(error.stack); // Log stack in verbose mode
    }
    // Attempt cleanup even on error if the directory was created
    if (structuredPartialsDir && (options.deletePartials ?? (process.env.SLURP_DELETE_PARTIALS !== 'false'))) {
        try {
            log.verbose(`Attempting cleanup of partials directory on error: ${structuredPartialsDir}`);
            await fs.remove(structuredPartialsDir);
            log.verbose(`Partials directory deleted during error cleanup.`);
        } catch (cleanupError) {
            log.warn(`Failed to cleanup partials directory during error handling: ${cleanupError.message}`);
        }
    }
    return { success: false, error: error };
  }
}
export { runSlurpWorkflow, extractNameFromUrl };