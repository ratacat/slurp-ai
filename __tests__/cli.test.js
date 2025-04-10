// __tests__/cli.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import path from 'path';

// --- Mock Dependencies ---
// Mock the core workflow/compiler functions called by the CLI
vi.mock('../src/slurpWorkflow.js', () => ({
  runSlurpWorkflow: vi.fn().mockResolvedValue({ success: true, compiledFilePath: 'compiled/mock_output.md' }),
  extractNameFromUrl: vi.fn(url => path.basename(url || 'default').replace(/[^a-z0-9_-]/gi, '_')), // Simple mock
}));
vi.mock('../src/MarkdownCompiler.js', () => ({
  MarkdownCompiler: vi.fn().mockImplementation(() => ({
    compile: vi.fn().mockResolvedValue({
      outputFile: '/path/to/compiled_docs.md',
      stats: { processedFiles: 5 },
    }),
    // Mock properties accessed if needed (e.g., inputDir for cleanup log)
    inputDir: '/mock/input/dir'
  })),
}));

// Mock the logger used within cli.js (assuming it's self-contained or passed around)
// If cli.js imports its own logger instance, we might need to adjust the mock path
// For now, assume we can intercept console logs or mock a logger if cli.js exported one.
// Let's mock console methods as cli.js uses them directly via its internal 'log' object.
const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
// We might need to mock chalk as well if we assert on colored output
vi.mock('chalk', async (importOriginal) => {
    const originalChalk = await importOriginal();
    // Return a basic object that returns the input string for color methods
    const noColorChalk = {
        green: (str) => str,
        red: (str) => str,
        yellow: (str) => str,
        gray: (str) => str,
        blue: (str) => str,
    };
    // Merge with original chalk if it has other necessary properties/methods
    return {
        ...originalChalk,
        ...noColorChalk,
        default: { // Handle potential default export
             ...originalChalk.default,
            ...noColorChalk,
        }
    };
});


// --- Test Subject ---
// We need to import the CLI script *after* setting up mocks
// and potentially re-import it in tests if needed after changing process.argv
let cliMain; // Variable to hold the main function

describe('CLI Script (cli.js)', () => {
  let originalArgv;
  let runSlurpWorkflowMock;
  let MarkdownCompilerMock;
  let compileMockInstance; // To access the instance's compile method

  beforeEach(async () => {
    // Store original argv and reset mocks
    originalArgv = [...process.argv];
    vi.clearAllMocks(); // Clear mocks including console spies

    // Re-import mocks to get fresh instances/spies
    const slurpWorkflow = await import('../src/slurpWorkflow.js');
    const compilerModule = await import('../src/MarkdownCompiler.js');
    runSlurpWorkflowMock = slurpWorkflow.runSlurpWorkflow;
    MarkdownCompilerMock = compilerModule.MarkdownCompiler;

    // Set up the mock implementation to capture the instance and its methods
     MarkdownCompilerMock.mockImplementation(() => {
        const instance = {
             compile: vi.fn().mockResolvedValue({
                 outputFile: '/path/to/compiled_docs.md',
                 stats: { processedFiles: 5 },
             }),
             inputDir: '/mock/input/dir' // Mock property accessed
        };
        compileMockInstance = instance; // Store instance for later access to compile spy
        return instance;
     });


     // Mock process.cwd() used by compiler defaults if not overridden
     vi.spyOn(process, 'cwd').mockReturnValue('/test/cli/cwd');

  });

  afterEach(() => {
    // Restore original argv
    process.argv = originalArgv;
    vi.restoreAllMocks(); // Restore console spies and cwd
  });

  // --- isUrl Helper Tests ---
  // Tested implicitly via main logic below

  // --- Main Logic Tests ---
  describe('main function dispatching', () => {

    // Helper to set argv and run main (assuming main can be called/triggered)
    const runCliWithArgs = async (args) => {
        process.argv = ['node', 'cli.js', ...args];
         // Use isolateModules to ensure mocks are applied before module execution.
         // This re-imports and runs the cli.js script's top-level code.
         await vi.isolateModules(async () => {
             await import('../cli.js');
         });
    };

    it('should call runSlurpWorkflow when first argument is a URL', async () => {
      const url = 'https://example.com/my-docs';
      await runCliWithArgs([url, '--max', '10']);

      expect(runSlurpWorkflowMock).toHaveBeenCalledOnce();
      expect(runSlurpWorkflowMock).toHaveBeenCalledWith(url, expect.objectContaining({
          maxPages: 10, // Check if options are parsed and passed
      }));
      expect(MarkdownCompilerMock).not.toHaveBeenCalled();
      // Check console log via spy
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(`Running Slurp workflow for URL: ${url}`));
    });

    it('should call runSlurpWorkflow for "fetch <url>" command', async () => {
        const url = 'https://fetch.example.com';
        await runCliWithArgs(['fetch', url, '--version', '3.0']);

        expect(runSlurpWorkflowMock).toHaveBeenCalledOnce();
        expect(runSlurpWorkflowMock).toHaveBeenCalledWith(url, expect.objectContaining({
            version: '3.0',
        }));
        expect(MarkdownCompilerMock).not.toHaveBeenCalled();
    });

    it('should show error for "fetch <package>" command (as it\'s disabled)', async () => {
        await runCliWithArgs(['fetch', 'react']);
        expect(runSlurpWorkflowMock).not.toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Fetching documentation by package name is disabled.'));
    });


    it('should call MarkdownCompiler for "compile" command', async () => {
      await runCliWithArgs(['compile', '--input', './in', '--output', './out.md']);

      expect(MarkdownCompilerMock).toHaveBeenCalledOnce();
      expect(MarkdownCompilerMock).toHaveBeenCalledWith(expect.objectContaining({
          inputDir: './in', // Option provided
          outputFile: './out.md', // Option provided
      }));
      // Ensure the compile method on the *instance* was called
       expect(compileMockInstance.compile).toHaveBeenCalledOnce();
       expect(runSlurpWorkflowMock).not.toHaveBeenCalled();
       expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Compiling documentation...'));
       expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Compilation complete!')); // Success log
    });

     it('should use default paths for "compile" if options omitted', async () => {
        await runCliWithArgs(['compile']);

        // Defaults depend on env vars and cwd mock set in beforeEach
        const expectedDefaultInput = '/test/cli/cwd/slurp_partials_env'; // env + cwd
        // Output file option is undefined, compiler calculates its default

        expect(MarkdownCompilerMock).toHaveBeenCalledOnce();
        expect(MarkdownCompilerMock).toHaveBeenCalledWith(expect.objectContaining({
            inputDir: expectedDefaultInput, // Default derived from env/cwd
            outputFile: undefined, // Option not provided
        }));
        expect(compileMockInstance.compile).toHaveBeenCalledOnce();
     });

     it('should handle legacy "--url" flag by calling runSlurpWorkflow', async () => {
        const url = 'https://legacy.example.com';
        await runCliWithArgs(['--url', url, '--version', 'legacy-v']);

        expect(runSlurpWorkflowMock).toHaveBeenCalledOnce();
        expect(runSlurpWorkflowMock).toHaveBeenCalledWith(url, expect.objectContaining({
            version: 'legacy-v',
            library: undefined, // library flag not provided
        }));
        expect(MarkdownCompilerMock).not.toHaveBeenCalled();
     });

     it('should show help if no command or URL is provided', async () => {
        await runCliWithArgs([]);
        // Check if console.log was called with something containing 'Usage:'
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Usage:'));
        expect(runSlurpWorkflowMock).not.toHaveBeenCalled();
        expect(MarkdownCompilerMock).not.toHaveBeenCalled();
     });

     it('should show help for unrecognized commands', async () => {
        await runCliWithArgs(['unknown-command']);
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Usage:'));
        expect(runSlurpWorkflowMock).not.toHaveBeenCalled();
        expect(MarkdownCompilerMock).not.toHaveBeenCalled();
     });

     it('should handle errors from runSlurpWorkflow', async () => {
        const error = new Error('Workflow failed');
        runSlurpWorkflowMock.mockRejectedValue(error);
        const url = 'https://fail.example.com';

        // Wrap in try/catch IF cli.js re-throws, otherwise check logs/exit code
        // The current cli.js catches and logs, so we check consoleErrorSpy
        await runCliWithArgs([url]);

        expect(runSlurpWorkflowMock).toHaveBeenCalledWith(url, expect.anything());
        // Check if the catch block in cli.js logged the error
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(`Unexpected error during Slurp workflow: ${error.message}`));
     });

      it('should handle errors from compiler.compile', async () => {
        const error = new Error('Compile failed');
        // Ensure the mock instance's compile rejects
        compileMockInstance.compile.mockRejectedValue(error);

        await runCliWithArgs(['compile']);

        expect(compileMockInstance.compile).toHaveBeenCalledOnce();
        // Check if the catch block in cli.js logged the error
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(`Error during compilation: ${error.message}`));
     });

  });
});