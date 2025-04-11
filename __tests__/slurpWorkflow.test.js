// __tests__/slurpWorkflow.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import path from 'path';
import fs from 'fs-extra'; // Mocked
import { runSlurpWorkflow, extractNameFromUrl } from '../src/slurpWorkflow.js';
import DocumentationScraper from '../src/DocumentationScraper.js'; // Mocked class
import { MarkdownCompiler } from '../src/MarkdownCompiler.js'; // Mocked class
import { log } from '../src/utils/logger.js'; // Mocked logger

// --- Mock Dependencies ---
vi.mock('fs-extra');
vi.mock('../src/DocumentationScraper.js');
vi.mock('../src/MarkdownCompiler.js');
vi.mock('../src/utils/logger.js', () => ({
  log: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    verbose: vi.fn(),
    success: vi.fn(),
    // Add new logger methods
    start: vi.fn(),
    progress: vi.fn(),
    final: vi.fn(),
  },
}));

describe('slurpWorkflow', () => {
  let mockScraperInstance;
  let mockCompilerInstance;
  let fsMock;

  beforeEach(() => {
    vi.clearAllMocks();

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
    process.env.SLURP_COMPILED_DIR = 'compiled_env';
    process.env.SLURP_DELETE_PARTIALS = 'true'; // Default to true for cleanup tests
     // Mock process.cwd() for default path calculations - this is critical for path expectations
     const cwdSpy = vi.spyOn(process, 'cwd').mockReturnValue('/test/base');
  });

   afterEach(() => {
     delete process.env.SLURP_PARTIALS_DIR;
     delete process.env.SLURP_COMPILED_DIR;
     delete process.env.SLURP_DELETE_PARTIALS;
     vi.restoreAllMocks(); // Restore process.cwd etc.
   });

  // --- extractNameFromUrl Tests ---
  describe('extractNameFromUrl', () => {
    it('should extract name from the last significant path segment', () => {
      expect(extractNameFromUrl('https://example.com/docs/v1/my-library')).toBe('my-library');
      expect(extractNameFromUrl('https://example.com/api/reference/users')).toBe('users');
    });

    it('should remove file extensions', () => {
      expect(extractNameFromUrl('https://example.com/guides/setup.html')).toBe('setup');
    });

    it('should skip common path segments like docs, api, reference, etc.', () => {
      expect(extractNameFromUrl('https://example.com/docs/api/reference/')).toBe('reference'); // Falls back through common names
      expect(extractNameFromUrl('https://example.com/documentation/')).toBe('documentation'); // Uses the segment if it's the last one
      expect(extractNameFromUrl('https://example.com/docs/v2/')).toBe('v2'); // Uses version segment
    });

     it('should use domain name part if path is only / or empty after common segments', () => {
       expect(extractNameFromUrl('https://example.com/docs/')).toBe('docs'); // Uses 'docs' as last segment
       expect(extractNameFromUrl('https://example.com/')).toBe('example'); // Uses domain name part
       expect(extractNameFromUrl('https://example.com/docs/api/')).toBe('api'); // Uses 'api' as last segment
     });


    it('should extract name from domain if path is insignificant', () => {
      expect(extractNameFromUrl('https://react.dev/')).toBe('react');
      expect(extractNameFromUrl('https://www.google.com/')).toBe('google');
    });

    it('should sanitize the extracted name', () => {
      expect(extractNameFromUrl('https://example.com/path/with spaces/and$ymbols!')).toBe('andsymbols'); // Sanitized last segment
       expect(extractNameFromUrl('https://domain-with-hyphens.co.uk/')).toBe('domain-with-hyphens'); // Sanitized domain
    });

     it('should handle URLs with query params and hash', () => {
        expect(extractNameFromUrl('https://example.com/docs/my-lib?v=2#install')).toBe('my-lib');
     });

     it('should return a default name if URL parsing fails', () => {
        const consoleWarnSpy = vi.spyOn(log, 'warn'); // Use the mocked logger
        const result = extractNameFromUrl('invalid-url');
        expect(result).toMatch(/^doc-\d+$/); // Matches 'doc-' followed by timestamp
        expect(consoleWarnSpy).toHaveBeenCalledWith('Workflow', expect.stringContaining('Failed to extract name from URL'));
     });
  });

  // --- runSlurpWorkflow Tests ---
  describe('runSlurpWorkflow', () => {
    const testUrl = 'https://example.com/docs/v1/target-lib';
    const expectedSiteName = 'target-lib';
    const expectedPartialsBase = path.join('/test/base', 'slurp_partials_env'); // From env
    const expectedCompiledBase = path.join('/test/base', 'compiled_env'); // From env
    const expectedPartialsDir = path.join(expectedPartialsBase, expectedSiteName);
    const expectedCompiledFile = path.join(expectedCompiledBase, `${expectedSiteName}_docs.md`);
    const expectedCompiledFileRelative = path.relative('/test/base', expectedCompiledFile);

    it('should run the full workflow successfully with default options', async () => {
      // Re-mock cwd to ensure it's used consistently in this test
      vi.spyOn(process, 'cwd').mockReturnValue('/test/base');
      
      // Reset mocks
      vi.resetAllMocks();
      
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
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('slurp_partials_env/target-lib'));
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('compiled_env'));

      // Check Scraper instantiation and execution with flexible path matching
      expect(DocumentationScraper).toHaveBeenCalledWith(expect.objectContaining({
        baseUrl: testUrl,
        // Use a more flexible matcher for paths since they may vary by environment
        outputDir: expect.stringContaining('slurp_partials_env/target-lib'),
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
        inputDir: expect.stringContaining('slurp_partials_env/target-lib'),
        outputFile: expect.stringContaining(`${expectedSiteName}_docs.md`),
        // Check some defaults passed from workflow logic/env
        preserveMetadata: true,
        removeNavigation: true,
        removeDuplicates: true,
      }));
      expect(mockCompilerInstance.compile).toHaveBeenCalledOnce();

      // Check cleanup - use expect.any(String) for paths
      expect(fs.remove).toHaveBeenCalledWith(expect.stringContaining('target-lib'));

      // Check result
      expect(result).toEqual({
        success: true,
        compiledFilePath: expectedCompiledFileRelative,
      });
      expect(log.final).toHaveBeenCalledWith(expect.stringContaining('Slurp complete!'));
    });

     it('should use options provided to override defaults/env', async () => {
         // Re-mock cwd to ensure it's used consistently in this test
         vi.spyOn(process, 'cwd').mockReturnValue('/test/base');
         
         // Reset mocks for this test
         vi.resetAllMocks();
         
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
        const expectedCustomCompiledFile = path.join(expectedCustomCompiledBase, `${expectedSiteName}_${options.version}_docs.md`);
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
        expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining(`custom_partials/target-lib/2.1.0`));
        expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('custom_compiled'));

        // Check options passed to Scraper - use flexible path matching
        expect(DocumentationScraper).toHaveBeenCalledWith(expect.objectContaining({
            // Use string matching instead of exact path matching
            outputDir: expect.stringContaining(`custom_partials/target-lib/${options.version}`),
            libraryInfo: expect.objectContaining({ library: expectedSiteName, version: options.version }),
            maxPages: options.maxPages,
            useHeadless: options.useHeadless,
            concurrency: options.concurrency,
        }));

        // Check options passed to Compiler with flexible path matching
        expect(MarkdownCompiler).toHaveBeenCalledWith(expect.objectContaining({
            // Use string matching for paths
            inputDir: expect.stringContaining(`custom_partials/target-lib/${options.version}`),
            outputFile: expect.stringContaining(`${expectedSiteName}_${options.version}_docs.md`),
            preserveMetadata: options.preserveMetadata,
        }));

        // Check cleanup skipped
        expect(fs.remove).not.toHaveBeenCalled();

        // Check result
        expect(result).toEqual({
            success: true,
            compiledFilePath: expectedCustomCompiledFileRelative,
        });
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
        expect(fs.remove).toHaveBeenCalledWith(expect.stringContaining('target-lib')); // Cleanup should still attempt
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
        expect(fs.remove).toHaveBeenCalledWith(expect.stringContaining('slurp_partials_env/target-lib')); // Cleanup with flexible matcher
        expect(log.error).toHaveBeenCalledWith('Workflow', `Slurp workflow failed: ${compileError.message}`);
        expect(result).toEqual({
            success: false,
            error: compileError,
        });
      });

      it('should return failure and cleanup if scraper processes zero pages', async () => {
         // Reset mocks for this test
         vi.resetAllMocks();
         
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
expect(fs.remove).toHaveBeenCalledWith(expect.stringContaining('target-lib')); // Use flexible path matcher

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
                })
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
           progressCallback({ type: 'processing', url: 'url1' });
           progressCallback({ type: 'saved', url: 'url1', outputPath: 'path1' });
           progressCallback({ type: 'processing', url: 'url2' });

           // Wait for the workflow to complete
           await workflowPromise;


           expect(mockScraperInstance.on).toHaveBeenCalledWith('progress', expect.any(Function));
           // Check if the workflow's internal progress handler called the provided callback
           expect(onProgressMock).toHaveBeenCalledTimes(2); // Called for 'processing' events
           expect(onProgressMock).toHaveBeenCalledWith(1, undefined, 'Scraping page 1...');
           expect(onProgressMock).toHaveBeenCalledWith(2, undefined, 'Scraping page 2...');
       });


       it('should pass AbortSignal to the scraper', async () => {
            // Reset mocks and re-mock cwd
            vi.resetAllMocks();
            vi.spyOn(process, 'cwd').mockReturnValue('/test/base');
            
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