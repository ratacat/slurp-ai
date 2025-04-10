# Plan: Implement `--base-path` for Scrape Scope Limiting

**Goal:** Introduce a `--base-path` CLI option to allow users to limit the scope of scraped URLs, preventing the crawler from following links outside a specified URL prefix. This filtering is conditional based on the `SLURP_ENFORCE_BASE_PATH` environment variable.

**1. CLI Changes (`src/cli.js`)**

*   Use `yargs` to add a new option:
    *   `--base-path`:
        *   Description: "URL prefix required for discovered links to be added to the scrape queue. Only active if SLURP_ENFORCE_BASE_PATH is true. Defaults to the scrape_start_url if omitted."
        *   Type: `string`
        *   Optional.
*   The primary positional argument `<url>` remains the `scrape_start_url`.
*   In the command handler:
    *   Determine the effective `basePath`: `argv.basePath || argv.url`.
    *   Pass both `scrape_start_url` (`argv.url`) and the effective `basePath` to the `slurpWorkflow` or `DocumentationScraper`.

**2. Core Logic Changes (`src/DocumentationScraper.js`)**

*   Update the constructor or relevant methods to accept both `startUrl` and `basePath`.
*   Store the `basePath`.
*   Modify the `_isValidUrl(url)` method (or wherever link filtering occurs):
    *   Check if `process.env.SLURP_ENFORCE_BASE_PATH === 'true'`.
    *   If true, add a condition: the absolute `url` must start with `this.basePath`.
    *   `return url.startsWith(this.basePath);` (in addition to existing checks like same origin, already visited etc.)
    *   If `SLURP_ENFORCE_BASE_PATH` is not true, this specific check is skipped.
*   **Crucially:** Ensure the logic for *resolving* relative URLs (e.g., turning `/about` into `https://example.com/about`) still uses the *current page's URL* as its base, *not* the `basePath` option. `basePath` is purely for filtering fully resolved URLs before adding them to the queue.

**3. Configuration (`.env.example`, `README.md`)**

*   Add `SLURP_ENFORCE_BASE_PATH=false` to `.env.example` with a comment explaining its purpose (e.g., `# Set to true to only scrape URLs starting with the --base-path (or the start URL if --base-path is omitted)`).
*   Document this environment variable in the README.

**4. Testing (`__tests__/cli.test.js`, `__tests__/DocumentationScraper.test.js`)**

*   **CLI Tests:**
    *   Verify `--base-path` is parsed correctly.
    *   Verify the default value is handled (uses `scrape_start_url` when flag is missing).
*   **Scraper Tests:**
    *   Mock `process.env.SLURP_ENFORCE_BASE_PATH`.
    *   Test case: `SLURP_ENFORCE_BASE_PATH=true`, `--base-path` provided.
        *   Assert URLs starting with `basePath` are queued.
        *   Assert URLs *not* starting with `basePath` (but same origin) are *not* queued.
    *   Test case: `SLURP_ENFORCE_BASE_PATH=true`, `--base-path` omitted.
        *   Assert URLs starting with `scrape_start_url` are queued.
        *   Assert URLs *not* starting with `scrape_start_url` (but same origin) are *not* queued.
    *   Test case: `SLURP_ENFORCE_BASE_PATH=false` (or not set).
        *   Assert URLs are queued based on existing logic (e.g., same origin) regardless of whether they start with `basePath` or `scrape_start_url`.
    *   Test relative URL resolution remains correct (uses current page URL).

**5. Documentation (`README.md`)**

*   Update the main command usage example: `node slurp.js <scrape_start_url> [--base-path <url>] [options]`
*   Add a section explaining `--base-path` and its interaction with `SLURP_ENFORCE_BASE_PATH`.
*   Provide clear examples:
    *   Simple scrape: `node slurp.js https://example.com/docs`
    *   Scoped scrape (only if env var is true): `node slurp.js https://example.com/docs/section1 --base-path https://example.com/docs/`
    *   How the default works (only if env var is true): `node slurp.js https://example.com/docs` (effectively implies `--base-path https://example.com/docs`)

    **6. Think about detecting when / why this should be used**
    That will be useful in implementing the MCP, or automatically determining to keep our simple functionality of `slurp <url>`