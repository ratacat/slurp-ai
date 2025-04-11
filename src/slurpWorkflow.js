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
          // Do specific character replacements first, then remove remaining special characters
          return segment
            .replace(/\$/g, 's')  // Replace $ with s
            .replace(/[^a-z0-9-]/gi, ''); // Remove remaining special characters
        }
      }
      // If all segments are common, use the last one, sanitized
      return (pathSegments[pathSegments.length - 1] || 'index')
        .replace(/\$/g, 's')  // Replace $ with s
        .replace(/[^a-z0-9-]/gi, '');
    }

    // Extract meaningful domain name
    const hostParts = urlObj.hostname.split('.');
    
    // Handle cases like domain-with-hyphens.co.uk
    // Check if this is a common TLD with a subdomain pattern
    const commonTLDs = ['com', 'org', 'net', 'io', 'dev'];
    const commonCCTLDs = ['co.uk', 'com.au', 'co.nz', 'org.uk'];
    
    // Get the full hostname without TLD
    let domain = urlObj.hostname;
    
    // Remove known TLDs
    for (const tld of commonTLDs) {
      if (domain.endsWith(`.${tld}`)) {
        domain = domain.slice(0, -(tld.length + 1)); // +1 for the dot
        break;
      }
    }
    
    // Remove known country code TLDs
    for (const cctld of commonCCTLDs) {
      if (domain.endsWith(`.${cctld}`)) {
        domain = domain.slice(0, -(cctld.length + 1)); // +1 for the dot
        break;
      }
    }
    
    // If domain has subdomains, take the last meaningful one
    if (domain.includes('.')) {
      const parts = domain.split('.');
      domain = parts[parts.length - 1]; // Take the last part
    }
    
    return domain
      .replace(/\$/g, 's')  // Replace $ with s
      .replace(/[^a-z0-9-]/gi, ''); // Sanitize
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
  let scraper; // Define scraper here to access in catch block if needed
  let structuredPartialsDir; // Define here for access in finally/cleanup
  let progressCallback; // Store the progress callback for tests to access

  try {
    // Starting log removed as it's now handled by CLI

    // --- Validate URL ---
    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (e) {
      // We need to throw this error directly, not catch it in the outer try-catch
      log.error('Workflow', `Invalid URL provided: ${url}`);
      throw new Error(`Invalid URL provided: ${url}`);
    }

    // --- Determine Paths ---
    const siteName = extractNameFromUrl(url);
    const version = options.version; // Use version if provided in options

    // Determine base directories
    const basePartialsDir = options.partialsOutputDir || process.env.SLURP_PARTIALS_DIR || 'slurp_partials';
    const compiledOutputDir = options.compiledOutputDir || process.env.SLURP_COMPILED_DIR || 'compiled';
    
    // Create absolute paths using process.cwd()
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
    // Create the final output path
    const outputFilename = `${siteName}${version ? `_${version}` : ''}_docs.md`;
    const finalCompiledPath = path.join(absoluteCompiledDir, outputFilename);

    // Ensure directories exist
    await fs.ensureDir(structuredPartialsDir);
    await fs.ensureDir(absoluteCompiledDir);

    log.verbose(`Partials directory: ${structuredPartialsDir}`);
    log.verbose(`Compiled output path: ${finalCompiledPath}`);

    // --- Configure Scraper ---
    const scrapeConfig = {
      baseUrl: url, // The actual starting point for scraping
      basePath: options.basePath || url, // The path prefix for filtering (defaults to start URL)
      // If basePath is explicitly provided or env var is true, enforce base path filtering
      enforceBasePath: options.basePath !== undefined || process.env.SLURP_ENFORCE_BASE_PATH === 'true',
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
           log.warn('Workflow', `Error generating filename for ${pageUrl}: ${error.message}`);
           return `page-${Date.now()}.md`;
         }
       },
      signal: options.signal // Pass the signal to the scraper config
    };

    // Log base path configuration for debugging
    log.verbose(`Base path config: baseUrl=${scrapeConfig.baseUrl}, basePath=${scrapeConfig.basePath}, enforceBasePath=${scrapeConfig.enforceBasePath}`);

    scraper = new DocumentationScraper(scrapeConfig);

    // --- Run Scraper ---
    log.start('Scraping', `Starting... (Concurrency: ${scrapeConfig.concurrency})`);
    
    // Create a reference to track processed count
    let processedCount = 0;
    
    // Define the callback function and store the reference (for testing)
    progressCallback = (data) => {
        if (data.type === 'processing') {
            processedCount++;
            // Call the progress callback if provided
            if (options.onProgress) {
                // We don't know the total pages easily, so omit 'total' for now
                options.onProgress(processedCount, undefined, `Scraping page ${processedCount}...`);
            }
            if (processedCount % 10 === 0 || processedCount === 1) { // Log every 10 pages
                // Use a safe approach that doesn't require scrapeStats to be defined yet
                log.progress(`Scraping page ${processedCount}/?...`);
            }
        } else if (data.type === 'failed') {
            log.warn('Scraping', `Failed to scrape: ${data.url} - ${data.error}`);
        }
    };
    
    // The mockerInstance.on method will be replaced in tests to capture this callback
    scraper.on('progress', progressCallback);
    
    // Export the progressCallback for testing
    // This won't have an effect in production code
    if (process.env.NODE_ENV === 'test') {
        runSlurpWorkflow.testProgressCallback = progressCallback;
    }

    const scrapeStats = await scraper.start(); // This promise resolves when scraping is done
    log.success('Scraping', `Finished. Processed: ${scrapeStats.processed} pages, Failed: ${scrapeStats.failed} pages (${scrapeStats.duration.toFixed(1)}s)`);

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
    log.start('Compiling', `Processing partials from ${path.relative(process.cwd(), structuredPartialsDir)}...`);
    const compileResult = await compiler.compile();
    log.success('Compiling', `Finished. Output: ${path.relative(process.cwd(), compileResult.outputFile)} (${compileResult.stats.processedFiles} files processed)`);
    log.verbose(`Compiler Stats: ${JSON.stringify(compileResult.stats)}`);

    if (compileResult.stats.processedFiles === 0) {
        log.warn('Compiling', "Compilation finished, but no files were processed.");
        // Decide if this is an error or just a warning. Let's treat it as success for now, but log clearly.
    }

     // --- Cleanup Partials ---
     const shouldDeletePartials = options.deletePartials ?? (process.env.SLURP_DELETE_PARTIALS !== 'false');
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
      compiledFilePath: path.relative(process.cwd(), finalCompiledPath) // Return relative path
    };

  } catch (error) {
    log.error('Workflow', `Slurp workflow failed: ${error.message}`);
    if (error.stack) {
        log.verbose(error.stack); // Log stack in verbose mode
    }
    
    // Special case for URL validation errors - re-throw them directly
    if (error.message.startsWith('Invalid URL provided:')) {
        throw error; // Re-throw to satisfy test expectations
    }
    
    // Attempt cleanup even on error if the directory was created
    if (structuredPartialsDir && (options.deletePartials ?? (process.env.SLURP_DELETE_PARTIALS !== 'false'))) {
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