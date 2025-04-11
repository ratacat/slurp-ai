# SlurpAI Logging Overhaul Plan

**Version:** 1.0
**Date:** 2025-04-11

## 1. Goal

Refactor the logging system in SlurpAI to provide clearer, more structured, and professional output during execution, while retaining detailed debugging information via a `--verbose` flag.

## 2. Removing Old Log Calls

The following log calls, identified in the previous audit, should be removed or replaced according to the new system outlined below.

*   `src/cli.js`: Lines 102, 127, 130, 136, 138, 153, 158, 168, 174, 193, 197, 198, 199, 205, 224, 240, 241, 243, 254, 255, 256, 257, 258, 260, 266, 268, 272, 290
*   `src/slurpWorkflow.js`: Lines 72, 106, 114, 147, 148, 190, 198, 203, 218, 221, 235, 255, 257, 258, 261, 268, 270, 272, 276, 285, 287, 298, 300, 302
*   `src/DocumentationScraper.js`: Lines 251, 437, 441, 477, 494, 510, 511, 512, 513

*(Note: The debug logs previously commented out in `src/cli.js` line 88-91 and `src/utils/logger.js` line 64-66 are already handled).*

## 3. Proposed New Logging System

### 3.1. Standard Output Format

The standard output (visible without `--verbose`) should follow this structure:

```text
🚀 Starting Slurp for: <URL>
   Base Path Filter: <Base Path URL or "None">
   Output Name: <Derived Name>

🔎 [Scraping] Starting... (Concurrency: <N>)
   ➡️ Scraping page <X>/<Y>: <URL>  (Optional, maybe only first/last few?)
   ➡️ Scraping page <X>/<Y>... (Periodic progress update)
   ⚠️ Failed to scrape: <URL> - <Error Message> (Only for errors)
   ✅ [Scraping] Finished. Processed: <N> pages, Failed: <N> pages (<Duration>s)

⚙️ [Compiling] Processing partials from <Partials Directory Path>...
   ✅ [Compiling] Finished. Output: <Compiled File Path> (<N> files processed)
   ⚠️ Compilation finished, but no files were processed. (If applicable)

🧹 [Cleanup] Deleting partials directory: <Partials Directory Path>... (If applicable)

✨ Slurp complete! Final output: <Compiled File Path>

❌ Slurp failed: <Error Message> (Only on critical failure)
```

### 3.2. Log Levels & Emojis

*   **Start/Info:** 🚀 (Initial), 🔎 (Scraping Start), ⚙️ (Compiling Start), 🧹 (Cleanup Start) - Use `log.start(stage, message)`
*   **Progress:** ➡️ - Use `log.progress(message)`
*   **Success:** ✅ - Use `log.success(stage, message)`
*   **Warning:** ⚠️ - Use `log.warn(stage, message)`
*   **Error:** ❌ - Use `log.error(stage, message)`
*   **Final Success:** ✨ - Use `log.final(message)`
*   **Verbose/Debug:** (No emoji, only shown with `--verbose`) - Use `log.verbose(message)`

### 3.3. Logger Utility (`src/utils/logger.js`)

The logger utility will be updated to support these levels and formats.

```javascript
// src/utils/logger.js (Proposed Structure)
import chalk from 'chalk';

const verbose = process.env.SLURP_VERBOSE === 'true' || process.argv.includes('--verbose');

// Basic structure, implementation details TBD
const log = {
  start: (stage, message) => {
    const emojiMap = { Scraping: '🔎', Compiling: '⚙️', Cleanup: '🧹', Init: '🚀' };
    console.log(`${emojiMap[stage] || 'ℹ️'} [${stage}] ${message}`);
  },
  progress: (message) => {
    // Consider using process.stdout.write for overwritable progress later
    console.log(chalk.blue(`   ➡️ ${message}`)); // Indented progress
  },
  success: (stage, message) => {
    console.log(chalk.green(`   ✅ [${stage}] ${message}`)); // Indented success
  },
  warn: (stage, message) => {
    console.log(chalk.yellow(`   ⚠️ ${stage ? `[${stage}] ` : ''}${message}`)); // Indented warning
  },
  error: (stage, message) => {
    console.error(chalk.red(`   ❌ ${stage ? `[${stage}] ` : ''}${message}`)); // Indented error to stderr
  },
  final: (message) => {
    console.log(chalk.magenta(`\n✨ ${message}`)); // Final success message
  },
  verbose: (message) => {
    if (verbose) {
      // Maybe add a timestamp or module prefix for verbose?
      console.log(chalk.gray(`[VERBOSE] ${message}`));
    }
  },
  // Keep original debug commented out or remove entirely
  // debug: (message) => { /* Disabled */ },
};

export { log };
```

### 3.4. CLI Logger (`src/cli.js`)

The `log` object created within `src/cli.js` should be removed entirely. All logging should be done via the imported `log` from `src/utils/logger.js`.

## 4. Future Logging Rules for Developers

1.  **Use the Central Logger:** Always import and use the `log` object from `src/utils/logger.js`. Do NOT use `console.log`, `console.error`, etc., directly for application logging.
2.  **Choose the Right Level:**
    *   `log.start(stage, msg)`: For beginning major phases (Scraping, Compiling, Cleanup, Init).
    *   `log.progress(msg)`: For iterative progress within a stage (e.g., page scraped). Keep these concise.
    *   `log.success(stage, msg)`: For successful completion of a major stage or significant sub-task.
    *   `log.warn(stage, msg)`: For non-critical issues or potential problems the user should be aware of (e.g., failed page scrape, empty compilation).
    *   `log.error(stage, msg)`: For critical errors that prevent successful completion of a stage or the entire workflow.
    *   `log.final(msg)`: ONLY for the single, final success message at the very end of the CLI run.
    *   `log.verbose(msg)`: For detailed internal state, variable values, or steps useful ONLY for debugging the tool itself. Assume these are hidden by default.
3.  **Be Concise:** Keep log messages clear and to the point. Avoid overly technical jargon in standard logs.
4.  **Provide Context:** Include relevant information (URLs, file paths, counts) where helpful. Use relative paths for user-facing file locations.
5.  **No Debug Logs in Standard Output:** Ensure `log.verbose` is used for anything not intended for the standard user view.

## 5. Implementation Steps & Code Updates (Approximate)

*(Note: These are illustrative examples based on the audit. Exact implementation will require careful code modification.)*

**Step 1: Update `src/utils/logger.js`**

*   Replace the existing `log` object with the proposed structure above.

**Step 2: Update `src/cli.js`**

*   Remove the local `log` object definition (lines 67-92).
*   Import the central logger: `import { log } from './utils/logger.js';`
*   Replace existing log calls:
    *   Line 102: `log.start('Init', \`Starting Slurp for: ${url}\`);`
    *   Add: `log.info(\`   Base Path Filter: ${workflowOptions.basePath || 'None'}\`);` (Requires extracting `workflowOptions` earlier or passing `log` down)
    *   Add: `log.info(\`   Output Name: ${extractNameFromUrl(url)}\`);` (Requires importing `extractNameFromUrl` or passing `log` down)
    *   Line 127: (Handled by `slurpWorkflow.js`)
    *   Line 130: (Handled by `slurpWorkflow.js`)
    *   Line 136: `log.error('Workflow', \`Unexpected error: ${error.message}\`);`
    *   Line 138: `log.verbose(\`Stack trace: ${error.stack}\`);`
    *   Line 153: `log.error('CLI', 'Missing package name. Usage: slurp read <package> [version]');`
    *   Line 158: `log.start('Read', \`Reading local documentation for ${readPackage}${readVersion ? \`@${readVersion}\` : ''}\`);`
    *   Line 168: `log.error('CLI', 'Missing URL. Usage: slurp fetch <url> [--version <version>]');`
    *   Line 174: `log.verbose(\`Detected fetch URL: ${fetchArg}\`);`
    *   Line 193: (Handled by `slurpWorkflow.js`)
    *   Line 197: `log.error('CLI', 'Fetching documentation by package name is disabled.');`
    *   Lines 198, 199: `log.info('   Please provide a direct URL using `slurp <url>` or `slurp fetch <url>`.');` (Keep as info, maybe consolidate, indent)
    *   Line 205: `log.start('Compile', 'Compiling documentation...');`
    *   Line 224: `log.error('Compile', \`Error parsing exclude patterns: ${error.message}\`);`
    *   Line 240: (Handled by `slurpWorkflow.js` or remove if redundant)
    *   Line 241: (Handled by `slurpWorkflow.js`)
    *   Line 243: Remove `log.summary`. The final summary should come from `slurpWorkflow.js`.
    *   Lines 254-258: (Handled by `slurpWorkflow.js`)
    *   Line 260: (Handled by `slurpWorkflow.js`)
    *   Line 266: (Handled by `slurpWorkflow.js`)
    *   Line 268: (Handled by `slurpWorkflow.js`)
    *   Line 272: `log.error('Compile', \`Error during compilation: ${error.message}\`);`
    *   Line 290: (Handled by `slurpWorkflow.js`)
    *   Remove debug logs (lines 94, 95, 97, 123, 125, 180, 231, 235, 237, 287).

**Step 3: Update `src/slurpWorkflow.js`**

*   Import the central logger: `import { log } from './utils/logger.js';`
*   Replace existing log calls:
    *   Line 72: `log.warn('Workflow', \`Failed to extract name from URL "${url}": ${error.message}\`);`
    *   Line 106: (Redundant, handled by CLI) Remove.
    *   Line 114: `log.error('Workflow', \`Invalid URL provided: ${url}\`);`
    *   Line 147: `log.verbose(\`Partials directory: ${structuredPartialsDir}\`);`
    *   Line 148: `log.verbose(\`Compiled output path: ${finalCompiledPath}\`);`
    *   Line 190: `log.warn('Workflow', \`Error generating filename for ${pageUrl}: ${error.message}\`);`
    *   Line 198: `log.verbose(\`Base path config: baseUrl=${scrapeConfig.baseUrl}, basePath=${scrapeConfig.basePath}, enforceBasePath=${scrapeConfig.enforceBasePath}\`);`
    *   Line 203: `log.start('Scraping', \`Starting... (Concurrency: ${scrapeConfig.concurrency})\`);`
    *   Line 218: `log.progress(\`Scraping page ${processedCount}/${scrapeStats.total || '?'}: ${data.url}\`);` (Needs adjustment to get total count if possible)
    *   Line 221: `log.warn('Scraping', \`Failed to scrape: ${data.url} - ${data.error}\`);`
    *   Line 235: `log.success('Scraping', \`Finished. Processed: ${scrapeStats.processed} pages, Failed: ${scrapeStats.failed} pages (${scrapeStats.duration.toFixed(1)}s)\`);`
    *   Line 255: `log.start('Compiling', \`Processing partials from ${path.relative(process.cwd(), structuredPartialsDir)}...\`);`
    *   Line 257: `log.success('Compiling', \`Finished. Output: ${path.relative(process.cwd(), compileResult.outputFile)} (${compileResult.stats.processedFiles} files processed)\`);`
    *   Line 258: `log.verbose(\`Compiler Stats: ${JSON.stringify(compileResult.stats)}\`);`
    *   Line 261: `log.warn('Compiling', "Compilation finished, but no files were processed.");`
    *   Line 268: `log.start('Cleanup', \`Deleting partials directory: ${path.relative(process.cwd(), structuredPartialsDir)}...\`);`
    *   Line 270: `log.verbose(\`Partials directory deleted.\`);`
    *   Line 272: `log.verbose(\`Skipping partials deletion as no files were compiled.\`);`
    *   Line 276: `log.final(\`Slurp complete! Final output: ${path.relative(process.cwd(), finalCompiledPath)}\`);`
    *   Line 285: `log.error('Workflow', \`Slurp workflow failed: ${error.message}\`);`
    *   Line 287: `log.verbose(\`Stack trace: ${error.stack}\`);`
    *   Line 298: `log.verbose(\`Attempting cleanup of partials directory on error: ${structuredPartialsDir}\`);`
    *   Line 300: `log.verbose(\`Partials directory deleted during error cleanup.\`);`
    *   Line 302: `log.warn('Cleanup', \`Failed to cleanup partials directory during error handling: ${cleanupError.message}\`);`

**Step 4: Update `src/DocumentationScraper.js`**

*   Import the central logger: `import { log } from './utils/logger.js';`
*   Replace existing log calls:
    *   Line 251: `log.warn('Scraping', 'Abort signal received. Stopping scrape queue.');`
    *   Line 437: `log.warn('Scraping', 'Scrape aborted before starting.');`
    *   Line 441: (Handled by `slurpWorkflow.js`) Remove.
    *   Line 477: `log.warn('Scraping', \`No progress for ${hangTimeout / 1000}s. Assuming hung tasks. Proceeding...\`);`
    *   Line 494: `log.warn('Scraping', \`Error closing browser: ${closeError.message}\`);`
    *   Lines 510-513: (Handled by `slurpWorkflow.js`) Remove.
    *   Replace internal `log.debug` calls with `log.verbose`.

## 6. Considerations

*   **Verbose Level:** The current plan keeps verbose logs separate. We might want a more granular system later (e.g., different levels like `debug`, `trace`), but `verbose` is a good start.
*   **Error Handling:** Ensure errors are logged consistently using `log.error` and provide enough context. Critical workflow failures should clearly state the failure.
*   **Testing:** Update any tests that assert specific console output to match the new logging format.