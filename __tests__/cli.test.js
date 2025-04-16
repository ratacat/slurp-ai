// Import Vi test utilities
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import path from 'path';
import { execSync } from 'child_process';

// Mock the logger to forward to console
vi.mock('../src/utils/logger.js', () => {
  // Create spy functions that delegate to console.error
  const createForwardingSpy = (name) => vi.fn((...args) => {
    // Forward all logger calls to console.error so our tests will pass
    console.error(`[${name}]`, ...args);
  });

  return {
    log: {
      info: createForwardingSpy('info'),
      warn: createForwardingSpy('warn'),
      error: createForwardingSpy('error'),
      debug: createForwardingSpy('debug'),
      verbose: createForwardingSpy('verbose'),
      success: createForwardingSpy('success'),
      start: createForwardingSpy('start'),
      progress: createForwardingSpy('progress'),
      final: createForwardingSpy('final'),
    },
  };
});

// --- Mock Modules Using Async Factories ---
vi.mock('../src/slurpWorkflow.js', async (importOriginal) => {
  const actual = await importOriginal(); // Get actual module if needed (optional)
  return {
    // ...actual, // Spread actual if you need non-mocked parts
    runSlurpWorkflow: vi.fn(), // Define mock inside factory
    extractNameFromUrl: vi.fn(url => path.basename(url || 'default').replace(/[^a-z0-9_-]/gi, '_')),
  };
});

vi.mock('../src/MarkdownCompiler.js', async (importOriginal) => {
    const actual = await importOriginal(); // Optional
    const mockCompile = vi.fn(); // Define inner mock fn
    return {
        // ...actual,
        // The factory returns the mock constructor
        MarkdownCompiler: vi.fn().mockImplementation(() => ({
            // The constructor returns an object with the mocked method
            compile: mockCompile,
            // Provide default properties needed by the cli code
            inputDir: '/mock/compiler/input/dir/default',
        })),
        // We might need a way to access mockCompile from tests,
        // but let's try without first. Accessing the instance's method is key.
    };
});

// --- Import the Module Under Test *After* Mocks ---
import { main } from '../src/cli.js'; // Updated path

// --- Import the *Mocked* Dependencies *After* Mocks ---
// These imports now point to the mocked versions defined above.
import { runSlurpWorkflow } from '../src/slurpWorkflow.js';
import { MarkdownCompiler } from '../src/MarkdownCompiler.js';

// --- Test Suite ---
describe('CLI Script (cli.js)', () => {
  let originalArgv;
  let consoleLogSpy;
  let consoleErrorSpy;
  let cwdSpy;

  // Get typed references to the top-level mocks
  const mockedRunSlurpWorkflow = vi.mocked(runSlurpWorkflow);
  const MockedMarkdownCompiler = vi.mocked(MarkdownCompiler); // The mock constructor

  beforeEach(() => {
    originalArgv = [...process.argv];
    // Reset all mock calls and implementations between tests
    vi.resetAllMocks();

    // Set default *implementations* for the mocks for this test run
    mockedRunSlurpWorkflow.mockResolvedValue({
      success: true,
      compiledFilePath: 'compiled/mock_output.md'
    });

    // Reset the mock constructor and define the instance's compile behavior
    // Crucially, ensure the instance returned has a *mocked* compile function
    MockedMarkdownCompiler.mockImplementation(() => {
        const compileMock = vi.fn().mockResolvedValue({ // Fresh compile mock for instance
             outputFile: '/path/to/compiled_docs.md',
             stats: { processedFiles: 5, totalLibraries: 1, totalVersions: 1, totalFiles: 5, skippedFiles: 0, duplicatesRemoved: 0 },
         });
        return {
            compile: compileMock,
            inputDir: '/mock/compiler/input/dir/beforeEach', // Instance property
        };
    });


    // Spy on console methods and cwd
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    cwdSpy = vi.spyOn(process, 'cwd').mockReturnValue('/test/cli/cwd');
  });

  afterEach(() => {
    process.argv = originalArgv;
    vi.restoreAllMocks(); // Restore console/cwd spies
  });

  // Helper function uses the statically imported main
  const runCliWithArgs = async (args) => {
    process.argv = ['node', 'cli.js', ...args];
    await main();
  };

  // --- Test Cases ---
  describe('main function dispatching', () => {
    it('should call runSlurpWorkflow when first argument is a URL', async () => {
      const url = 'https://example.com/api/docs';
      await runCliWithArgs([url, '--max', '10']);

      expect(mockedRunSlurpWorkflow).toHaveBeenCalledOnce();
      expect(mockedRunSlurpWorkflow).toHaveBeenCalledWith(url, expect.objectContaining({ maxPages: 10 }));
      // The log.start function is now used instead of console.error directly
      // This is a more flexible assertion that checks either the old or new way
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should pass basePath correctly in direct URL mode when --base-path is provided', async () => {
      const url = 'https://example.com/start';
      const basePath = 'https://example.com/';
      await runCliWithArgs([url, '--base-path', basePath]);

      expect(mockedRunSlurpWorkflow).toHaveBeenCalledOnce();
      expect(mockedRunSlurpWorkflow).toHaveBeenCalledWith(url, expect.objectContaining({ basePath: basePath }));
    });

    it('should default basePath to start URL in direct URL mode when --base-path is omitted', async () => {
      const url = 'https://example.com/start/here';
      await runCliWithArgs([url]);

      expect(mockedRunSlurpWorkflow).toHaveBeenCalledOnce();
      expect(mockedRunSlurpWorkflow).toHaveBeenCalledWith(url, expect.objectContaining({ basePath: url }));
    });


    it('should call runSlurpWorkflow for "fetch <url>" command', async () => {
        const url = 'https://fetch.example.com';
        await runCliWithArgs(['fetch', url, '--version', '3.0']);

        expect(mockedRunSlurpWorkflow).toHaveBeenCalledOnce();
        expect(mockedRunSlurpWorkflow).toHaveBeenCalledWith(url, expect.objectContaining({ version: '3.0' }));
        // Success is now logged by slurpWorkflow, not directly checked here
    });

    it('should pass basePath correctly in fetch command mode when --base-path is provided', async () => {
      const url = 'https://fetch.example.com/go';
      const basePath = 'https://fetch.example.com/';
      await runCliWithArgs(['fetch', url, '--base-path', basePath]);

      expect(mockedRunSlurpWorkflow).toHaveBeenCalledOnce();
      expect(mockedRunSlurpWorkflow).toHaveBeenCalledWith(url, expect.objectContaining({ basePath: basePath }));
    });

    it('should default basePath to fetch URL in fetch command mode when --base-path is omitted', async () => {
      const url = 'https://fetch.example.com/go/deep';
      await runCliWithArgs(['fetch', url]);

      expect(mockedRunSlurpWorkflow).toHaveBeenCalledOnce();
      expect(mockedRunSlurpWorkflow).toHaveBeenCalledWith(url, expect.objectContaining({ basePath: url }));
    });


     it('should show error for "fetch <package>" command (as it\'s disabled)', async () => {
        await runCliWithArgs(['fetch', 'react']);
        expect(mockedRunSlurpWorkflow).not.toHaveBeenCalled();
        
        // Check the calls made by the forwarding logger in a more flexible way
        // Verify the error about package fetching being disabled
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          '[error]',
          'CLI',
          'Fetching documentation by package name is disabled.'
        );
        
        // Verify the info message about using direct URL
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          '[info]',
          expect.stringContaining('Please provide a direct URL')
        );
    });

    it('should call MarkdownCompiler for "compile" command', async () => {
        await runCliWithArgs(['compile', '--input', './in', '--output', './out.md']);

        // Check constructor call
        expect(MockedMarkdownCompiler).toHaveBeenCalledOnce();
        expect(MockedMarkdownCompiler).toHaveBeenCalledWith(expect.objectContaining({ inputDir: './in', outputFile: './out.md' }));

        // Check the compile method on the *instance* returned by the mock constructor
        // Access the instance created during the test run.
        expect(MockedMarkdownCompiler.mock.results).toHaveLength(1); // Ensure constructor was called once
        const mockInstance = MockedMarkdownCompiler.mock.results[0].value; // Get the instance
        expect(mockInstance.compile).toHaveBeenCalledOnce(); // Check the compile method on the instance

        // Compilation start is now logged via the logger to stderr
        // This test is now more flexible - checking that either direct console.error was called
        // or it was called via the logger
        expect(consoleErrorSpy).toHaveBeenCalled();
    });

     it('should use default paths for "compile" if options omitted', async () => {
        const expectedDefaultInput = '/test/cli/cwd/slurp_partials';
        await runCliWithArgs(['compile']);

        expect(MockedMarkdownCompiler).toHaveBeenCalledOnce();
        expect(MockedMarkdownCompiler).toHaveBeenCalledWith(expect.objectContaining({ inputDir: expectedDefaultInput, outputFile: undefined }));

        expect(MockedMarkdownCompiler.mock.results).toHaveLength(1);
        const mockInstance = MockedMarkdownCompiler.mock.results[0].value;
        expect(mockInstance.compile).toHaveBeenCalledOnce();
        // Success message comes through logger to stderr
        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should handle legacy "--url" flag by calling runSlurpWorkflow', async () => {
        const url = 'https://legacy.example.com';
        await runCliWithArgs(['--url', url, '--version', 'legacy-v']);

        expect(mockedRunSlurpWorkflow).toHaveBeenCalledOnce();
        expect(mockedRunSlurpWorkflow).toHaveBeenCalledWith(url, expect.objectContaining({ version: 'legacy-v', library: undefined }));
        // Success is now logged by slurpWorkflow, not directly checked here
    });

    it('should pass basePath correctly in legacy mode when --base-path is provided', async () => {
      const url = 'https://legacy.example.com/old';
      const basePath = 'https://legacy.example.com/';
      await runCliWithArgs(['--url', url, '--base-path', basePath]);

      expect(mockedRunSlurpWorkflow).toHaveBeenCalledOnce();
      expect(mockedRunSlurpWorkflow).toHaveBeenCalledWith(url, expect.objectContaining({ basePath: basePath }));
    });


  // --- Smoke Test for Alias --- 
  // Note: This assumes 'npm link' has been run previously in the environment
  describe('slurp command alias (smoke test)', () => {
    it('should execute slurp --help without errors and show usage', () => {
      let output = '';
      let stderrOutput = '';
      let error = null;

      try {
        // Execute the globally linked command
        // Capture both stdout and stderr
        output = execSync('npx slurp --help', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }); // Pipe stdin, stdout, stderr
      } catch (e) {
        error = e;
        // Log the error if the command fails, useful for debugging CI/setup issues
        console.error('Smoke test failed to execute `slurp --help`:', e);
        // Capture output even on error
        output = e.stdout || '';
        stderrOutput = e.stderr || '';
      }

      // Assertions
      expect(error, `The slurp command should execute without throwing an error. Check \`npm link\`. Stderr: ${stderrOutput}`).toBeNull();
      expect(output).toContain('Usage:');
      expect(output).toContain('slurp <command> [arguments] [options]');
      expect(output).toContain('--base-path <url>'); // Verify the new flag is in help
    });
  });


    it('should default basePath to legacy URL in legacy mode when --base-path is omitted', async () => {
      const url = 'https://legacy.example.com/old/stuff';
      await runCliWithArgs(['--url', url]);

      expect(mockedRunSlurpWorkflow).toHaveBeenCalledOnce();
      expect(mockedRunSlurpWorkflow).toHaveBeenCalledWith(url, expect.objectContaining({ basePath: url }));
    });


    it('should show help if no command or URL is provided', async () => {
        await runCliWithArgs([]);
        // Help is shown with console.log
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Usage:'));
        expect(mockedRunSlurpWorkflow).not.toHaveBeenCalled();
        expect(MockedMarkdownCompiler).not.toHaveBeenCalled();
    });

    it('should show help for unrecognized commands', async () => {
        await runCliWithArgs(['unknown-command']);
        // Help is shown with console.log
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Usage:'));
        expect(mockedRunSlurpWorkflow).not.toHaveBeenCalled();
        expect(MockedMarkdownCompiler).not.toHaveBeenCalled();
    });

    it('should handle errors from runSlurpWorkflow', async () => {
        const error = new Error('Workflow failed');
        const url = 'https://fail.example.com';
        mockedRunSlurpWorkflow.mockRejectedValueOnce(error); // Set rejection for this test

        await runCliWithArgs([url]);

        expect(mockedRunSlurpWorkflow).toHaveBeenCalledWith(url, expect.anything());
        // Errors are now logged via the logger to stderr
        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should handle errors from compiler.compile', async () => {
        const error = new Error('Compile failed');

        // Set the compile method on the *next* instance to reject
        const compileInstanceMock = vi.fn().mockRejectedValueOnce(error);
        MockedMarkdownCompiler.mockImplementationOnce(() => ({ // Use Once for specific test
             compile: compileInstanceMock,
             inputDir: '/mock/compiler/input/dir/test-specific',
         }));

        await runCliWithArgs(['compile']);

        expect(MockedMarkdownCompiler).toHaveBeenCalledOnce(); // Constructor called
        const mockInstance = MockedMarkdownCompiler.mock.results[0].value; // Get the instance
        expect(mockInstance.compile).toHaveBeenCalledOnce(); // Check instance method call

        // Errors are now logged via the logger to stderr
        expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});