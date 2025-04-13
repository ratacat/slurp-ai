# Testing `cli.js`: A Debugging Journey

This document outlines the challenges encountered and solutions implemented while writing tests for `cli.js`, specifically focusing on testing the exported `main` function.

## Initial Problem: Mocks & Spies Not Hit

The primary challenge was that tests designed to verify calls to `runSlurpWorkflow` and `MarkdownCompiler` (via its `compile` method) consistently failed. Vitest spies reported that the mocked functions were called zero times, even though the test setup correctly invoked the `main` function with appropriate arguments.

Tests checking the help output (`showHelp`) passed, indicating the `main` function _was_ being executed, but the expected code paths involving the mocked dependencies were not being reached or the mocks weren't effective.

## Investigation & Hypotheses

Based on the `plans/cli_tests_failing.md` analysis, several hypotheses were considered:

1.  **Mocking Context Disconnect:** The mocks/spies set up in the test file might not apply to the instances of dependencies used within the `cli.js` module due to ESM module loading behavior.
2.  **Argument Parsing Flaw:** The argument parsing logic within `cli.js` might not correctly interpret `process.argv` when set programmatically in the test environment, leading the `main` function down an incorrect execution path (e.g., defaulting to `showHelp`).
3.  **Logging Wrapper Interference:** Spying directly on `console.error` might not capture calls made through the intermediate `log.error` function defined locally in `cli.js`.

## Solution Path & Iterations

The debugging process involved several steps:

1.  **Initial Error (Parse Failure):** An early test run failed with a `RollupError: Parse failure: Unexpected token .` pointing to a `log.debug` line. While this line was marked as legacy debug code and subsequently removed, it wasn't the root cause of the mock failures.

2.  **Argument Parsing Logic:** The core issue was identified in the argument parsing logic (originally lines 33-62).

    - **Problem:** The original parser assumed the _first_ argument (`args[0]`) was always a command word (like `fetch`, `compile`). It started parsing flags (`--flag`) only from the _second_ argument onwards. This meant that when a flag like `--url` was the _first_ argument (as in the legacy usage test), it was incorrectly treated as a command, and the `params.url` property was never set. Consequently, the `default` case in the `switch` statement, which checked `if (params.url)`, never executed the call to `runSlurpWorkflow`.
    - **Solution:** The parsing logic was completely rewritten (lines 33-62) to iterate through _all_ arguments (`rawArgs`). It now correctly identifies flags (`--key value` or `--key`) and positional arguments regardless of their position. The first non-flag argument is treated as the `command`, and subsequent non-flags become `positionalArgs`.

3.  **Reference Error (`workflowOptions`):** Fixing the argument parser introduced a new, unrelated error.
    - **Problem:** During the refactor, the call to `runSlurpWorkflow` within the `fetch` command case (line 180) was modified to merge options using `{ ...workflowOptions, ...fetchOptions }`. However, `workflowOptions` was only defined for the direct URL (`slurp <url>`) case, leading to a `ReferenceError: workflowOptions is not defined` when testing the `fetch` command.
    - **Solution:** The necessary general workflow options (`maxPages`, `useHeadless`, etc.) were explicitly defined within the `fetch` case (lines 173-179) by parsing the `params` object, similar to how it was done for the direct URL case. The call was updated to use `{ ...generalWorkflowOptions, ...fetchOptions }`.

## Key Takeaways

- **Robust Argument Parsing is Crucial:** CLI tools require careful argument parsing that handles various combinations of commands, flags, and positional arguments. The initial assumption about argument order was too simplistic for the required use cases.
- **Test Environment vs. Real Execution:** Differences in how arguments are passed or modules are loaded between a test environment (`process.argv` manipulation) and actual CLI execution can expose subtle bugs.
- **Refactoring Requires Careful Verification:** While fixing the parsing logic, a new error was introduced by incorrectly referencing a variable from a different scope. Thorough testing after refactoring is essential.
- **ESM Mocking Nuances:** While not the primary issue here, the initial hypothesis about ESM mocking challenges remains a valid consideration when testing modules that import dependencies. The successful fix via argument parsing suggests the mocks _were_ likely set up correctly, but the code path simply wasn't reaching them.
