# SlurpAI MCP Server Design

This document outlines the design decisions for integrating SlurpAI functionality as an MCP server.

## 1. Main Interaction

- **Goal:** Define what the primary MCP tool(s) should return.
- **Options:**
    - Return the full content of the compiled Markdown file.
    - Return the file path to the compiled Markdown file on the server's filesystem.
    - Other?
- **Decision:** Return the file path to the saved compiled Markdown document. This avoids potentially large responses and aligns with how agents might access local resources.

## 2. Tool Granularity

- **Goal:** Define the specific tools the MCP server will expose.
- **Options:**
    - One primary `slurp` tool that handles scraping and compiling.
    - Separate `scrape_documentation` and `compile_documentation` tools.
    - Additional tools mirroring CLI commands (`read_local`, `purge_cache`, `list_cache`)?
- **Decision:** Provide separate `scrape_documentation` and `compile_documentation` tools. This allows users to manage the intermediate partials if needed and offers more control over the workflow. We can consider adding cache management tools later if required.

## 3. Configuration Handling

- **Goal:** Define how users will pass configuration options (e.g., `maxPages`, `basePath`, `useHeadless`).
- **Options:**
    - Pass all options as arguments within the `use_mcp_tool` call's `arguments` JSON.
    - Rely on server-side configuration (less flexible)?
    - Combination?
- **Decision:** Allow overriding server defaults (e.g., from config.js or environment variables) with options passed explicitly in the tool call's `arguments` JSON object. Required parameters (like URL for scraping, input dir/paths for compiling) must always be provided in `arguments`.

## 4. Progress Reporting / Long-Running Tasks

- **Goal:** Address the asynchronous nature of scraping and provide feedback.
- **Options:**
    - Standard request/response (user waits, potentially long).
    - Use MCP resources? (e.g., create a resource representing the job status).
    - Asynchronous pattern (e.g., tool returns a job ID, separate tool to check status)? *MCP doesn't directly support this well yet.*
    - Log messages indicating progress (visible in server logs)?
- **Decision:** Use an MCP Resource for status tracking. The `scrape_documentation` tool will initiate the scrape in the background and immediately return a resource URI (e.g., `slurp://scrape-jobs/<job_id>`). The caller can then use `access_mcp_resource` with this URI to poll for status updates (e.g., "pending", "scraping: X pages", "compiling", "complete", "failed") and the final result (path to partials directory or error message).

## 5. Output Management

- **Goal:** Define where compiled documentation files are stored and how they are accessed/managed.
- **Options:**
    - Store files in a configurable directory on the server.
    - Implement caching based on URL/options?
    - Provide tools to list/manage cached/compiled documents?
    - Define retention/cleanup policy?
- **Decision:**
    - **Storage Location:** Default to a directory relative to the server's running location (e.g., `./slurp_mcp_output`), derived from `config.js` paths if possible, and configurable via an environment variable (e.g., `SLURPAI_MCP_OUTPUT_DIR`).
    - **Storage Structure:** Organize output within the storage location using `<siteName>/<version>/` subdirectories. The `siteName` should be derived more robustly from the full hostname of the target URL. Partials will go into a subdirectory within this structure (e.g., `<siteName>/<version>/partials/`), and the compiled file will reside directly within it (e.g., `<siteName>/<version>/compiled_docs.md`).
    - **Caching:** Implement caching for the results of both `scrape_documentation` (returning the path to the partials directory) and `compile_documentation` (returning the path to the final compiled file).
    - **Cache Key:** Generate cache keys by hashing the primary input (URL for scrape, partials path for compile) along with all relevant configuration arguments used for the specific tool call.
    - **Cache Refresh:** Add a `force_refresh: boolean` argument to both tools to bypass the cache lookup and force execution.