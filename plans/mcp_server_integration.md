# Plan: Integrate Slurp as an MCP Server

**Goal:** Create a Model Context Protocol (MCP) server for the Slurp project to allow programmatic access to its documentation scraping and compilation features, initially focusing on the direct URL workflow.

**Agreed Design:**

*   **Server Name:** `slurp-mcp-server` (or similar)
*   **Core Tool:** `slurp_url`
    *   Input: `{ url: string }`
    *   Action: Scrapes documentation starting from the given URL, compiles it into a single Markdown file within the `compiled/` directory.
    *   Output (Success): Returns an MCP Resource URI pointing to the compiled file (e.g., `slurp://compiled/<sitename>_docs.md`).
    *   Output (Failure): Returns a standard MCP tool error response.
*   **Resource Handling:**
    *   The server will handle `resources/read` requests for the custom `slurp://<relative_path>` URI scheme.
    *   It will read the corresponding local file (relative to the project root) and return its content.
*   **Deferred Features (V1):**
    *   Package name to URL lookup (`fetch <package>`).
    *   Explicit cache management tools (`list`, `purge`).

**Implementation Plan (5 Tasks):**

1.  **Refactor Core Logic:**
    *   **Objective:** Make the existing scrape-and-compile workflow callable programmatically.
    *   **Actions:**
        *   Identify the code sections in `cli.js` (and potentially `DocumentationScraper.js`, `MarkdownCompiler.js`) responsible for the direct URL (`slurp <url>`) workflow.
        *   Extract this logic into a new, reusable async function or module (e.g., `src/slurpWorkflow.js`).
        *   This function should accept the target URL and potentially configuration options (like those derived from `.env` or CLI flags previously).
        *   It should perform scraping, compilation, and optional partials cleanup.
        *   It should return the relative path to the successfully compiled Markdown file or throw specific errors on failure (e.g., invalid URL, scraping error, compilation error).
    *   **Files to Modify:** `cli.js` (to call the new function), potentially `DocumentationScraper.js`, `MarkdownCompiler.js`.
    *   **New Files:** `src/slurpWorkflow.js` (or similar).

2.  **Setup MCP Server Boilerplate:**
    *   **Objective:** Create the basic structure for the MCP server.
    *   **Actions:**
        *   Create the main server file: `mcp-server.js`.
        *   Add `@modelcontextprotocol/sdk` as a project dependency (`npm install @modelcontextprotocol/sdk`).
        *   In `mcp-server.js`, import necessary components from the SDK.
        *   Initialize the `McpServer` instance with basic server info (name: `slurp-mcp-server`, version: `1.0.0`).
        *   Declare server capabilities, indicating support for `tools` and `resources`.
        *   Set up the server to listen using the `StdioServerTransport`.
        *   Add basic error handling for server startup.
    *   **Files to Modify:** `package.json`.
    *   **New Files:** `mcp-server.js`.

3.  **Implement `slurp_url` Tool Logic:**
    *   **Objective:** Define and implement the `slurp_url` tool within the MCP server.
    *   **Actions:**
        *   Use `server.tool()` (or the equivalent SDK method) to define the `slurp_url` tool, including its name, description, and input schema (`{ url: string }`).
        *   Implement the tool's handler function.
        *   Inside the handler:
            *   Call the refactored workflow function (from Task 1) with the `url` provided in the tool arguments.
            *   Handle potential errors thrown by the workflow function, converting them into appropriate MCP error responses.
            *   On success, take the returned relative file path (e.g., `compiled/docs.md`) and format it as the `slurp://` resource URI (e.g., `slurp://compiled/docs.md`).
            *   Return the successful tool result containing the `resource_uri`.
    *   **Files to Modify:** `mcp-server.js`.

4.  **Implement Resource Handler:**
    *   **Objective:** Enable the server to serve the content of compiled files via `slurp://` URIs.
    *   **Actions:**
        *   Implement the `resources/read` request handler using `server.setRequestHandler` (or equivalent).
        *   Inside the handler:
            *   Check if the requested URI uses the `slurp://` scheme. If not, handle appropriately (e.g., error or ignore).
            *   Extract the relative path from the URI.
            *   Construct the full, absolute path to the local file, ensuring it stays within the project directory for security.
            *   Use Node.js `fs.readFile` (async) to read the file content.
            *   Handle file read errors (e.g., file not found) by returning an appropriate MCP error.
            *   On successful read, format the content into the `ReadResourceResult` structure (likely as `text` content with `mimeType: 'text/markdown'`).
            *   Return the result.
    *   **Files to Modify:** `mcp-server.js`.

5.  **Testing and Refinement:**
    *   **Objective:** Ensure the MCP server works correctly end-to-end.
    *   **Actions:**
        *   Manually test using an MCP client/inspector (like `@modelcontextprotocol/inspector` if available, or potentially build a minimal test client).
        *   Test Case 1 (Success):
            *   Call `slurp_url` with a valid URL. Verify it returns a `slurp://` URI.
            *   Call `access_mcp_resource` with the returned URI. Verify the correct Markdown content is returned.
        *   Test Case 2 (Scrape Error): Call `slurp_url` with an invalid/inaccessible URL. Verify an appropriate error is returned.
        *   Test Case 3 (Resource Error): Call `access_mcp_resource` with a non-existent `slurp://` URI. Verify a file-not-found error is returned.
        *   Add/refine logging within the server for better debugging.
        *   Ensure graceful handling of edge cases.
    *   **Files to Modify:** Potentially `mcp-server.js` based on test results.

### Debugging Notes & Findings (Post-Implementation)

During the testing phase (Task 5), significant issues were encountered when trying to read resources using the standard `mcp read-resource` command with the stdio transport.

*   **Initial Problem:** `mcp read-resource slurp://... node mcp-server.js` consistently failed with an RPC error: `error: RPC error -32603: Cannot read properties of undefined (reading 'match')`. Debugging indicated this crash occurred *before* the server's resource handler logic was executed.
*   **Hypothesis:** The `@modelcontextprotocol/sdk` server library attempts internal validation against the standard `ReadResourceRequestSchema` (which expects params as an object `{uri: "..."}`) even when the handler is registered differently. `mcp read-resource` sends the URI as a positional argument (`["..."]`), causing this validation to fail.
*   **Attempts:**
    *   Removing the schema from `server.resource()` led to `Cannot read properties of undefined (reading 'uriTemplate')`.
    *   Adding a URI template (`server.resource('slurp://{+path}', ...)`) still resulted in the original `reading 'match'` error, suggesting the SDK *always* tries to apply the standard schema validation for `resources/read` over stdio, regardless of registration details.
*   **Conclusion:** There appears to be a fundamental incompatibility or bug in the `@modelcontextprotocol/sdk` server library's handling of the standard `resources/read` method when invoked via `mcp read-resource` (with positional URI) over stdio transport.
*   **Workaround:** A new tool, `read_slurp_resource`, was added to `mcp-server.js`. This tool accepts the URI via named parameters (`{uri: "..."}`) and successfully reads the resource content. It must be invoked using `mcp call`:
    ```bash
    mcp call read_slurp_resource --params '{"uri": "slurp://compiled/master_docs.md"}' --format pretty node mcp-server.js
    ```
*   **Recommendation:** Use the `read_slurp_resource` tool via `mcp call` for accessing resources from this server over stdio, as `mcp read-resource` is currently non-functional in this setup.
