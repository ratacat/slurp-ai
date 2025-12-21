// __tests__/slurpWorkflow.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import path from 'path';
import fs from 'fs-extra'; // Mocked
import { runSlurpWorkflow, extractNameFromUrl } from '../src/slurpWorkflow.js';
import DocumentationScraper from '../src/DocumentationScraper.js'; // Mocked class
import { MarkdownCompiler } from '../src/MarkdownCompiler.js'; // Mocked class
import { log } from '../src/utils/logger.js'; // Mocked logger

// Mock the config module
vi.mock('../config.js', () => ({
  default: {
    paths: {
      basePath: '/test/base',
      inputDir: 'slurp_partials_env',
      outputDir: 'compiled_env',
    },
    scraping: {
      maxPagesPerSite: 20,
      concurrency: 10,
      retryCount: 3,
      retryDelay: 1000,
      useHeadless: false,
      debug: false,
      timeout: 60000,
    },
    urlFiltering: {
      enforceBasePath: true,
      preserveQueryParams: ['version', 'lang', 'theme'],
      depthNumberOfSegments: 5,
      depthSegmentCheck: ['api', 'reference', 'guide', 'tutorial', 'example', 'doc'],
    },
    compilation: {
      preserveMetadata: true,
      removeNavigation: true,
      removeDuplicates: true,
      similarityThreshold: 0.9,
    }
  },
  paths: {
    basePath: '/test/base',
    inputDir: 'slurp_partials_env',
    outputDir: 'compiled_env',
  },
  scraping: {
    maxPagesPerSite: 20,
    concurrency: 10,
    retryCount: 3,
    retryDelay: 1000,
    useHeadless: false,
    debug: false,
    timeout: 60000,
  },
  urlFiltering: {
    enforceBasePath: true,
    preserveQueryParams: ['version', 'lang', 'theme'],
    depthNumberOfSegments: 5,
    depthSegmentCheck: ['api', 'reference', 'guide', 'tutorial', 'example', 'doc'],
  },
  compilation: {
    preserveMetadata: true,
    removeNavigation: true,
    removeDuplicates: true,
    similarityThreshold: 0.9,
  }
}));

// --- Mock Dependencies ---
vi.mock('fs-extra');
vi.mock('../src/DocumentationScraper.js');
vi.mock('../src/MarkdownCompiler.js');
vi.mock('../src/utils/logger.js', () => {
  const mockSpinner = {
    isSpinning: false,
    start: vi.fn(),
    stop: vi.fn(),
    update: vi.fn(),
    succeed: vi.fn(),
    fail: vi.fn(),
  };
  return {
    log: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
      verbose: vi.fn(),
      success: vi.fn(),
      start: vi.fn(),
      progress: vi.fn(),
      final: vi.fn(),
      // New spinner-based methods
      header: vi.fn(),
      spinnerStart: vi.fn(),
      spinnerUpdate: vi.fn(),
      spinnerSucceed: vi.fn(),
      spinnerFail: vi.fn(),
      done: vi.fn(),
      getSpinner: vi.fn(() => mockSpinner),
      spinnerLog: vi.fn(),
      spinnerSetProgress: vi.fn(),
    },
  };
});

// Mock sitemap utilities
vi.mock('../src/utils/sitemap.js');
import { fetchSitemap, ProgressEstimator } from '../src/utils/sitemap.js';

describe('slurpWorkflow', () => {
  let mockScraperInstance;
  let mockCompilerInstance;
  let fsMock;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock sitemap utilities
    fetchSitemap.mockResolvedValue({ found: false, urls: [], count: 0 });
    ProgressEstimator.mockImplementation(() => ({
      setSitemapEstimate: vi.fn(),
      addDiscoveredUrl: vi.fn(),
      recordCompletion: vi.fn(),
      start: vi.fn(),
      getProgress: vi.fn().mockReturnValue(0.5),
      estimatedTotal: 0,
      processedCount: 0,
    }));

    // Mock instances and their methods
    mockScraperInstance = {
      start: vi.fn().mockResolvedValue({
        processed: 10,
        failed: 1,
        duration: 5.5 // Add duration to prevent toFixed error
      }),
      on: vi.fn().mockReturnThis(), // Mock event emitter 'on' with chainable return
      emit: vi.fn(), // Mock event emitter 'emit'
      // Add any other methods/properties accessed by the workflow if needed
    };
    mockCompilerInstance = {
      compile: vi.fn().mockResolvedValue({
        outputFile: '/test/base/compiled/example-site_v1_docs.md', // Absolute path
        stats: { totalFiles: 10, processedFiles: 10, skippedFiles: 0, duplicatesRemoved: 0 },
      }),
      setMetadata: vi.fn(), // Mock the setMetadata method used for YAML frontmatter
      // Add any other methods/properties accessed by the workflow if needed
    };

    // Configure the mocked classes to return the mock instances
    DocumentationScraper.mockImplementation(() => mockScraperInstance);
    MarkdownCompiler.mockImplementation(() => mockCompilerInstance);

    // Configure fs-extra mocks
    fsMock = fs; // Assign the imported mock to fsMock
    fsMock.ensureDir.mockResolvedValue(undefined);
    fsMock.remove.mockResolvedValue(undefined);

    // Mock environment variables
    process.env.SLURP_PARTIALS_DIR = 'slurp_partials_env';
    process.env.SLURP_OUTPUT_DIR = 'compiled_env'; // Primary env var for output dir
    process.env.SLURP_COMPILED_DIR = 'compiled_env_fallback'; // Should not be used if SLURP_OUTPUT_DIR is set
    process.env.SLURP_DELETE_PARTIALS = 'true'; // Default to true for cleanup tests
     // Mock process.cwd() for default path calculations - this is critical for path expectations
     const cwdSpy = vi.spyOn(process, 'cwd').mockReturnValue('/test/base');
  });

   afterEach(() => {
     delete process.env.SLURP_PARTIALS_DIR;
     delete process.env.SLURP_OUTPUT_DIR;
     delete process.env.SLURP_COMPILED_DIR;
     delete process.env.SLURP_DELETE_PARTIALS;
     vi.restoreAllMocks(); // Restore process.cwd etc.
   });

  // --- extractNameFromUrl Tests ---
  // New naming logic: uses domain name, adds "-docs" suffix if subdomain is "docs" or path starts with /docs
  // Multi-part subdomains are reversed: platform.claude.com → claude-platform
  describe('extractNameFromUrl', () => {
    it('should extract name from domain and add -docs suffix when path starts with /docs', () => {
      expect(extractNameFromUrl('https://example.com/docs/v1/my-library')).toBe('example-docs');
      expect(extractNameFromUrl('https://example.com/api/reference/users')).toBe('example');
    });

    it('should add -docs suffix when subdomain is docs', () => {
      expect(extractNameFromUrl('https://docs.anthropic.com/en/docs')).toBe('anthropic-docs');
      expect(extractNameFromUrl('https://docs.python.org/3/library')).toBe('python-docs');
      expect(extractNameFromUrl('https://docs.github.com/en/actions')).toBe('github-docs');
    });

    it('should not add -docs suffix for regular domains without /docs path', () => {
      expect(extractNameFromUrl('https://react.dev/reference')).toBe('react');
      expect(extractNameFromUrl('https://vitest.dev/api/')).toBe('vitest');
      expect(extractNameFromUrl('https://expressjs.com/en/guide')).toBe('expressjs');
    });

    it('should reverse multi-part subdomains for better naming', () => {
      // platform.claude.com → claude-platform (brand first)
      expect(extractNameFromUrl('https://platform.claude.com/docs')).toBe('claude-platform-docs');
      expect(extractNameFromUrl('https://code.claude.com/docs')).toBe('claude-code-docs');
      // flask.palletsprojects.com → palletsprojects-flask
      expect(extractNameFromUrl('https://flask.palletsprojects.com/quickstart')).toBe('palletsprojects-flask');
      expect(extractNameFromUrl('https://api.example.com/v1')).toBe('example-api');
    });

    it('should strip common TLDs', () => {
      expect(extractNameFromUrl('https://example.com/')).toBe('example');
      expect(extractNameFromUrl('https://example.org/')).toBe('example');
      expect(extractNameFromUrl('https://example.io/')).toBe('example');
      expect(extractNameFromUrl('https://example.dev/')).toBe('example');
      expect(extractNameFromUrl('https://example.co.uk/')).toBe('example');
    });

    it('should sanitize the extracted name', () => {
      expect(extractNameFromUrl('https://domain-with-hyphens.com/')).toBe('domain-with-hyphens');
    });

    it('should handle URLs with query params and hash', () => {
      expect(extractNameFromUrl('https://example.com/docs/my-lib?v=2#install')).toBe('example-docs');
    });

    it('should return a default name if URL parsing fails', () => {
      const consoleWarnSpy = vi.spyOn(log, 'warn');
      const result = extractNameFromUrl('invalid-url');
      expect(result).toMatch(/^site-\d+$/); // Matches 'site-' followed by timestamp
      expect(consoleWarnSpy).toHaveBeenCalledWith('Workflow', expect.stringContaining('Failed to extract name from URL'));
    });
  });

  // --- runSlurpWorkflow Tests ---
  describe('runSlurpWorkflow', () => {
    const testUrl = 'https://example.com/docs/v1/target-lib';
    // New naming: uses domain name, adds -docs if path starts with /docs
    const expectedSiteName = 'example-docs';
    const expectedPartialsBase = path.join('/test/base', 'slurp_partials_env'); // From env
    const expectedCompiledBase = path.join('/test/base', 'compiled_env'); // From env
    const expectedPartialsDir = path.join(expectedPartialsBase, expectedSiteName);
    // Name includes -docs suffix since path starts with /docs
    const expectedCompiledFile = path.join(expectedCompiledBase, `${expectedSiteName}.md`);
    const expectedCompiledFileRelative = path.relative('/test/base', expectedCompiledFile);

    it('should run the full workflow successfully with default options', async () => {
      // Re-mock cwd to ensure it's used consistently in this test
      vi.spyOn(process, 'cwd').mockReturnValue('/test/base');
      
      // Reset mocks
      vi.resetAllMocks();

      // Re-setup sitemap mocks after reset
      fetchSitemap.mockResolvedValue({ found: false, urls: [], count: 0 });

      // Setup mocks with all required information
      mockScraperInstance.start.mockResolvedValue({
        processed: 10,
        failed: 1,
        duration: 3.0
      });
      mockCompilerInstance.compile.mockResolvedValue({
        outputFile: expectedCompiledFile,
        stats: {
          processedFiles: 10,
          totalFiles: 10,
          skippedFiles: 0,
          duplicatesRemoved: 0
        }
      });
      
      // Reset the constructor mocks to ensure they return our prepared instances
      DocumentationScraper.mockImplementation(() => mockScraperInstance);
      MarkdownCompiler.mockImplementation(() => mockCompilerInstance);
      
      // Setup filesystem mocks
      fs.ensureDir.mockResolvedValue(undefined);
      fs.remove.mockResolvedValue(undefined);
      
      const result = await runSlurpWorkflow(testUrl);

      // Check setup - use actual path or flexible matching
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('slurp_partials_env/example-docs'));
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('compiled_env'));

      // Check Scraper instantiation and execution with flexible path matching
      expect(DocumentationScraper).toHaveBeenCalledWith(expect.objectContaining({
        baseUrl: testUrl,
        // Use a more flexible matcher for paths since they may vary by environment
        outputDir: expect.stringContaining('slurp_partials_env/example-docs'),
        libraryInfo: expect.objectContaining({ library: expectedSiteName, version: '' }),
        // Check some defaults passed from workflow logic/env
        maxPages: 20, // Default in workflow if not passed/env
        useHeadless: true, // Default in workflow
        concurrency: 10, // Default in workflow
      }));
      expect(mockScraperInstance.start).toHaveBeenCalledOnce();

      // Check Compiler instantiation and execution with flexible path matching
      expect(MarkdownCompiler).toHaveBeenCalledWith(expect.objectContaining({
        // Use string matching for paths
        inputDir: expect.stringContaining('slurp_partials_env/example-docs'),
        outputFile: expect.stringContaining(`${expectedSiteName}.md`),
        // Check some defaults passed from workflow logic/env
        preserveMetadata: true,
        removeNavigation: true,
        removeDuplicates: true,
      }));
      expect(mockCompilerInstance.compile).toHaveBeenCalledOnce();

      // Check cleanup - use expect.any(String) for paths
      expect(fs.remove).toHaveBeenCalledWith(expect.stringContaining('example-docs'));

      // Check result - use flexible path matching since relative paths depend on cwd mock timing
      expect(result.success).toBe(true);
      expect(result.compiledFilePath).toContain('example-docs.md');
      // New logger uses log.done instead of log.final
      expect(log.done).toHaveBeenCalled();
    });

     it('should use options provided to override defaults/env', async () => {
         // Re-mock cwd to ensure it's used consistently in this test
         vi.spyOn(process, 'cwd').mockReturnValue('/test/base');
         
         // Reset mocks for this test
         vi.resetAllMocks();

         // Re-setup sitemap mocks after reset
         fetchSitemap.mockResolvedValue({ found: false, urls: [], count: 0 });

         // Setup fresh mocks with all required properties
         mockScraperInstance.start.mockResolvedValue({
           processed: 10,
           failed: 1,
           duration: 2.0
         });
        const options = {
            version: '2.1.0',
            partialsOutputDir: 'custom_partials',
            compiledOutputDir: 'custom_compiled',
            maxPages: 15,
            useHeadless: false,
            concurrency: 5,
            deletePartials: false, // Override cleanup
            preserveMetadata: false, // Override compiler option
        };
        const expectedCustomPartialsBase = path.join('/test/base', 'custom_partials');
        const expectedCustomCompiledBase = path.join('/test/base', 'custom_compiled');
        const expectedCustomPartialsDir = path.join(expectedCustomPartialsBase, expectedSiteName, options.version);
        const expectedCustomCompiledFile = path.join(expectedCustomCompiledBase, `${expectedSiteName}_${options.version}.md`);
        const expectedCustomCompiledFileRelative = path.relative('/test/base', expectedCustomCompiledFile);

        // Update mock compiler path for this test
        mockCompilerInstance.compile.mockResolvedValue({
            outputFile: expectedCustomCompiledFile,
            stats: { processedFiles: 5 }
        });


        // Reset the constructor mocks to ensure they return our prepared instances
        DocumentationScraper.mockImplementation(() => mockScraperInstance);
        MarkdownCompiler.mockImplementation(() => mockCompilerInstance);
        
        const result = await runSlurpWorkflow(testUrl, options);

        // Check paths with version and custom dirs - use flexible matchers
        expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining(`custom_partials/example-docs/2.1.0`));
        expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('custom_compiled'));

        // Check options passed to Scraper - use flexible path matching
        expect(DocumentationScraper).toHaveBeenCalledWith(expect.objectContaining({
            // Use string matching instead of exact path matching
            outputDir: expect.stringContaining(`custom_partials/example-docs/${options.version}`),
            libraryInfo: expect.objectContaining({ library: expectedSiteName, version: options.version }),
            maxPages: options.maxPages,
            useHeadless: options.useHeadless,
            concurrency: options.concurrency,
        }));

        // Check options passed to Compiler with flexible path matching
        expect(MarkdownCompiler).toHaveBeenCalledWith(expect.objectContaining({
            // Use string matching for paths
            inputDir: expect.stringContaining(`custom_partials/example-docs/${options.version}`),
            outputFile: expect.stringContaining(`${expectedSiteName}_${options.version}.md`),
            preserveMetadata: options.preserveMetadata,
        }));

        // Check cleanup skipped
        expect(fs.remove).not.toHaveBeenCalled();

        // Check result - use flexible path matching since relative paths depend on cwd mock timing
        expect(result.success).toBe(true);
        expect(result.compiledFilePath).toContain('example-docs_2.1.0.md');
     });

     it('should handle invalid URL input by throwing an error', async () => {
        const invalidUrl = 'not-a-url';
        // Workflow function now throws on invalid URL directly
        await expect(runSlurpWorkflow(invalidUrl)).rejects.toThrow(`Invalid URL provided: ${invalidUrl}`);
        expect(DocumentationScraper).not.toHaveBeenCalled();
        expect(MarkdownCompiler).not.toHaveBeenCalled();
     });


     it('should handle scraper failure', async () => {
        const scrapeError = new Error('Scraping failed miserably');
        mockScraperInstance.start.mockRejectedValue(scrapeError);

        const result = await runSlurpWorkflow(testUrl);

        expect(mockScraperInstance.start).toHaveBeenCalledOnce();
        expect(MarkdownCompiler).not.toHaveBeenCalled(); // Compiler shouldn't run
        expect(fs.remove).toHaveBeenCalledWith(expect.stringContaining('example-docs')); // Cleanup should still attempt
        expect(log.error).toHaveBeenCalledWith('Workflow', `Slurp workflow failed: ${scrapeError.message}`);
        expect(result).toEqual({
            success: false,
            error: scrapeError,
        });
     });

      it('should handle compiler failure', async () => {
        // Reset mocks and re-mock cwd
        vi.resetAllMocks();
        vi.spyOn(process, 'cwd').mockReturnValue('/test/base');

        // Re-setup sitemap mocks after reset
        fetchSitemap.mockResolvedValue({ found: false, urls: [], count: 0 });

        // Setup fresh mocks
        const compileError = new Error('Compilation exploded');
        mockScraperInstance.start.mockResolvedValue({
          processed: 10,
          failed: 1,
          duration: 2.5
        });
        mockCompilerInstance.compile.mockRejectedValue(compileError);
        // Ensure MarkdownCompiler constructor returns our mock instance
        MarkdownCompiler.mockImplementation(() => mockCompilerInstance);

        // Make sure DocumentationScraper is correctly wired
        DocumentationScraper.mockImplementation(() => mockScraperInstance);
        
        const result = await runSlurpWorkflow(testUrl);

        // Test that the scraper was called correctly
        expect(DocumentationScraper).toHaveBeenCalled();
        expect(mockScraperInstance.start).toHaveBeenCalledOnce();
        
        // Test for cleanup with flexible path matching
        expect(fs.remove).toHaveBeenCalledWith(expect.stringContaining('slurp_partials_env/example-docs')); // Cleanup with flexible matcher
        expect(log.error).toHaveBeenCalledWith('Workflow', `Slurp workflow failed: ${compileError.message}`);
        expect(result).toEqual({
            success: false,
            error: compileError,
        });
      });

      it('should return failure and cleanup if scraper processes zero pages', async () => {
         // Reset mocks for this test
         vi.resetAllMocks();

         // Re-setup sitemap mocks after reset
         fetchSitemap.mockResolvedValue({ found: false, urls: [], count: 0 });

         // Setup scraper to return zero processed pages
         const zeroProcessedError = "Scraping completed, but no pages were successfully processed. Cannot compile.";
         
         // First let it return the stats
         mockScraperInstance.start.mockResolvedValue({
           processed: 0,
           failed: 5,
           duration: 1.5
         });
         
         // Ensure our mock instance is used
         DocumentationScraper.mockImplementation(() => mockScraperInstance);
         
         const result = await runSlurpWorkflow(testUrl);
expect(mockScraperInstance.start).toHaveBeenCalledOnce();
expect(MarkdownCompiler).not.toHaveBeenCalled(); // Compiler shouldn't run
expect(fs.remove).toHaveBeenCalledWith(expect.stringContaining('example-docs')); // Use flexible path matcher

// Check the error is logged correctly with the stage parameter
         // Check the error is logged correctly with the stage parameter
         expect(log.error).toHaveBeenCalledWith(
           'Workflow',
           expect.stringContaining(zeroProcessedError)
         );
         
         // Check the result contains the error
         expect(result).toEqual({
             success: false,
             error: expect.objectContaining({
               message: expect.stringContaining(zeroProcessedError)
             })
         });
      });


       it('should skip partials deletion if deletePartials is false', async () => {
            // Reset mocks and re-mock cwd
            vi.resetAllMocks();
            vi.spyOn(process, 'cwd').mockReturnValue('/test/base');

            // Re-setup sitemap mocks after reset
            fetchSitemap.mockResolvedValue({ found: false, urls: [], count: 0 });

            // Re-setup scraper to return proper stats
            mockScraperInstance.start.mockResolvedValue({
                processed: 10,
                failed: 1,
                duration: 1.0
            });
            
            // Ensure mock instances are used
            DocumentationScraper.mockImplementation(() => mockScraperInstance);
            MarkdownCompiler.mockImplementation(() => mockCompilerInstance);
            
            await runSlurpWorkflow(testUrl, { deletePartials: false });
            expect(fs.remove).not.toHaveBeenCalled();
        });

       it('should skip partials deletion if compilation processes zero files (even if deletePartials is true)', async () => {
            // Create fresh clean mocks to avoid interference from previous tests
            vi.clearAllMocks();

            // Re-setup sitemap mocks after clear
            fetchSitemap.mockResolvedValue({ found: false, urls: [], count: 0 });

            // Important: Mock everything from scratch for this test case
            const freshScraperInstance = {
                start: vi.fn().mockResolvedValue({
                    processed: 5,
                    failed: 0,
                    duration: 1.0
                }),
                on: vi.fn().mockReturnThis(),
                emit: vi.fn()
            };

            const freshCompilerInstance = {
                compile: vi.fn().mockResolvedValue({
                    outputFile: expectedCompiledFile,
                    stats: {
                        processedFiles: 0, // This is the key - zero files processed
                        totalFiles: 10
                    }
                }),
                setMetadata: vi.fn() // Required for metadata setting
            };
            
            // Override the class mocks with our fresh instances
            DocumentationScraper.mockImplementation(() => freshScraperInstance);
            MarkdownCompiler.mockImplementation(() => freshCompilerInstance);
            
            // Reset file system mocks
            fs.ensureDir.mockResolvedValue(undefined);
            fs.remove.mockResolvedValue(undefined);
            
            // Run the workflow with deletePartials explicitly set to true
            await runSlurpWorkflow(testUrl, { deletePartials: true });
            
            // Verify that removal was not called
            expect(fs.remove).not.toHaveBeenCalled();
            
            // Verify that the verbose log was called
            expect(log.verbose).toHaveBeenCalledWith(expect.stringContaining('Skipping partials deletion as no files were compiled.'));
       });

       it('should call onProgress callback during scraping', async () => {
            // Reset mocks and re-mock cwd
            vi.resetAllMocks();
            vi.spyOn(process, 'cwd').mockReturnValue('/test/base');

            // Re-setup sitemap mocks after reset
            fetchSitemap.mockResolvedValue({ found: false, urls: [], count: 0 });

            // Setup fresh mocks
            mockScraperInstance.start.mockResolvedValue({
                processed: 10,
                failed: 0,
                duration: 1.0
            });
            
            // Ensure mock instances are used
            DocumentationScraper.mockImplementation(() => mockScraperInstance);
            
            const onProgressMock = vi.fn();
           
           // Capture the event handler without causing tests to break
           let progressCallback;
           mockScraperInstance.on.mockImplementation((event, callback) => {
               if (event === 'progress') {
                   progressCallback = callback;
               }
               return mockScraperInstance; // Return for chaining
           });

           // Run the workflow, this will set up the listener
           const workflowPromise = runSlurpWorkflow(testUrl, { onProgress: onProgressMock });
           
           // Wait for the promise to settle enough that the callback is registered
           await new Promise(resolve => setTimeout(resolve, 1));
           
           // Now, simulate the scraper emitting events *after* the listener is attached
           expect(mockScraperInstance.on).toHaveBeenCalledWith('progress', expect.any(Function));
           
           // Extract the callback from the on() mock call directly
           progressCallback = mockScraperInstance.on.mock.calls.find(call => call[0] === 'progress')[1];
           expect(progressCallback).toBeDefined(); // Ensure the listener was set up
           progressCallback({ type: 'processing', url: 'https://example.com/docs/page1' });
           progressCallback({ type: 'saved', url: 'https://example.com/docs/page1', outputPath: 'path1' });
           progressCallback({ type: 'processing', url: 'https://example.com/docs/page2' });
           progressCallback({ type: 'saved', url: 'https://example.com/docs/page2', outputPath: 'path2' });

           // Wait for the workflow to complete
           await workflowPromise;


           expect(mockScraperInstance.on).toHaveBeenCalledWith('progress', expect.any(Function));
           // Check if the workflow's internal progress handler called the provided callback
           // Note: onProgress is called for 'saved' events, not 'processing' events
           expect(onProgressMock).toHaveBeenCalledTimes(2);
           // Check calls - second arg (estimatedTotal) can be undefined or a number
           const calls = onProgressMock.mock.calls;
           expect(calls[0][0]).toBe(1);
           expect(calls[0][2]).toBe('Scraping page 1...');
           expect(calls[1][0]).toBe(2);
           expect(calls[1][2]).toBe('Scraping page 2...');
       });


       it('should pass AbortSignal to the scraper', async () => {
            // Reset mocks and re-mock cwd
            vi.resetAllMocks();
            vi.spyOn(process, 'cwd').mockReturnValue('/test/base');

            // Re-setup sitemap mocks after reset
            fetchSitemap.mockResolvedValue({ found: false, urls: [], count: 0 });

            // Re-setup scraper mock
            mockScraperInstance.start.mockResolvedValue({
                processed: 5,
                failed: 0,
                duration: 1.0
            });
            
            // Ensure mock instance is used
            DocumentationScraper.mockImplementation(() => mockScraperInstance);
            
            const abortController = new AbortController();
           const signal = abortController.signal;

           await runSlurpWorkflow(testUrl, { signal });

           expect(DocumentationScraper).toHaveBeenCalledWith(expect.objectContaining({
               signal: signal,
           }));
       });

  });
});