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
      start: vi.fn().mockResolvedValue({ processed: 10, failed: 1 }),
      on: vi.fn(), // Mock event emitter 'on'
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
     // Mock process.cwd() for default path calculations
     vi.spyOn(process, 'cwd').mockReturnValue('/test/base');
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
        expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Failed to extract name from URL'));
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
      const result = await runSlurpWorkflow(testUrl);

      // Check setup
      expect(fs.ensureDir).toHaveBeenCalledWith(expectedPartialsDir);
      expect(fs.ensureDir).toHaveBeenCalledWith(expectedCompiledBase);

      // Check Scraper instantiation and execution
      expect(DocumentationScraper).toHaveBeenCalledWith(expect.objectContaining({
        baseUrl: testUrl,
        outputDir: expectedPartialsDir,
        libraryInfo: expect.objectContaining({ library: expectedSiteName, version: '' }),
        // Check some defaults passed from workflow logic/env
        maxPages: 20, // Default in workflow if not passed/env
        useHeadless: true, // Default in workflow
        concurrency: 10, // Default in workflow
      }));
      expect(mockScraperInstance.start).toHaveBeenCalledOnce();

      // Check Compiler instantiation and execution
      expect(MarkdownCompiler).toHaveBeenCalledWith(expect.objectContaining({
        inputDir: expectedPartialsDir,
        outputFile: expectedCompiledFile,
         // Check some defaults passed from workflow logic/env
         preserveMetadata: true,
         removeNavigation: true,
         removeDuplicates: true,
      }));
      expect(mockCompilerInstance.compile).toHaveBeenCalledOnce();

      // Check cleanup
      expect(fs.remove).toHaveBeenCalledWith(expectedPartialsDir);

      // Check result
      expect(result).toEqual({
        success: true,
        compiledFilePath: expectedCompiledFileRelative,
      });
      expect(log.success).toHaveBeenCalledWith(expect.stringContaining('Workflow completed.'));
    });

     it('should use options provided to override defaults/env', async () => {
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


        const result = await runSlurpWorkflow(testUrl, options);

        // Check paths with version and custom dirs
        expect(fs.ensureDir).toHaveBeenCalledWith(expectedCustomPartialsDir);
        expect(fs.ensureDir).toHaveBeenCalledWith(expectedCustomCompiledBase);

        // Check options passed to Scraper
        expect(DocumentationScraper).toHaveBeenCalledWith(expect.objectContaining({
            outputDir: expectedCustomPartialsDir,
            libraryInfo: expect.objectContaining({ library: expectedSiteName, version: options.version }),
            maxPages: options.maxPages,
            useHeadless: options.useHeadless,
            concurrency: options.concurrency,
        }));

        // Check options passed to Compiler
        expect(MarkdownCompiler).toHaveBeenCalledWith(expect.objectContaining({
            inputDir: expectedCustomPartialsDir,
            outputFile: expectedCustomCompiledFile,
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
        expect(fs.remove).toHaveBeenCalledWith(expectedPartialsDir); // Cleanup should still attempt
        expect(log.error).toHaveBeenCalledWith(`Slurp workflow failed: ${scrapeError.message}`);
        expect(result).toEqual({
            success: false,
            error: scrapeError,
        });
     });

      it('should handle compiler failure', async () => {
        const compileError = new Error('Compilation exploded');
        mockCompilerInstance.compile.mockRejectedValue(compileError);

        const result = await runSlurpWorkflow(testUrl);

        expect(mockScraperInstance.start).toHaveBeenCalledOnce();
        expect(mockCompilerInstance.compile).toHaveBeenCalledOnce();
        expect(fs.remove).toHaveBeenCalledWith(expectedPartialsDir); // Cleanup should still attempt
        expect(log.error).toHaveBeenCalledWith(`Slurp workflow failed: ${compileError.message}`);
        expect(result).toEqual({
            success: false,
            error: compileError,
        });
      });

      it('should return failure and cleanup if scraper processes zero pages', async () => {
         mockScraperInstance.start.mockResolvedValue({ processed: 0, failed: 5 }); // No pages processed

         const result = await runSlurpWorkflow(testUrl);

         expect(mockScraperInstance.start).toHaveBeenCalledOnce();
         expect(MarkdownCompiler).not.toHaveBeenCalled(); // Compiler shouldn't run
         expect(fs.remove).toHaveBeenCalledWith(expectedPartialsDir); // Cleanup should still attempt
         const expectedError = new Error("Scraping completed, but no pages were successfully processed. Cannot compile.");
         expect(log.error).toHaveBeenCalledWith(`Slurp workflow failed: ${expectedError.message}`);
         expect(result).toEqual({
             success: false,
             error: expect.any(Error), // Check if it's an error instance
         });
         // Check the error message specifically
          expect(result.error.message).toBe(expectedError.message);

      });


       it('should skip partials deletion if deletePartials is false', async () => {
           await runSlurpWorkflow(testUrl, { deletePartials: false });
           expect(fs.remove).not.toHaveBeenCalled();
       });

       it('should skip partials deletion if compilation processes zero files (even if deletePartials is true)', async () => {
            mockCompilerInstance.compile.mockResolvedValue({
                outputFile: expectedCompiledFile,
                stats: { processedFiles: 0 } // Simulate no files compiled
            });
           await runSlurpWorkflow(testUrl, { deletePartials: true });
           expect(fs.remove).not.toHaveBeenCalled();
           expect(log.verbose).toHaveBeenCalledWith('Skipping partials deletion as no files were compiled.');
       });

       it('should call onProgress callback during scraping', async () => {
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
           const abortController = new AbortController();
           const signal = abortController.signal;

           await runSlurpWorkflow(testUrl, { signal });

           expect(DocumentationScraper).toHaveBeenCalledWith(expect.objectContaining({
               signal: signal,
           }));
       });

  });
});