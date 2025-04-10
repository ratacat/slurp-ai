# SlurpAI

SlurpAI is a command-line tool that automatically scrapes web-based documentation from a given URL and converts it into a single, clean Markdown file optimized for AI consumption. It's designed to be used as a starting point for AI agents to consume documentation via MCP. 

## Features

- **Direct URL Scraping**: Fetches content directly from a starting URL.
- **Markdown Conversion**: Transforms HTML documentation into clean, structured markdown using Turndown.
- **Content Cleanup**: Attempts to remove common navigation elements and other non-content sections.
- **Compilation**: Combines content from scraped pages into a single output file.
- **Configurable**: Options can be set via a `.env` file.
- **Asynchronous**: Uses async/await for better performance and scalability.

## Installation

```bash
# Clone the repository
# git clone https://github.com/yourusername/slurpai.git # Replace with actual repo URL later
cd slurpai

# Install dependencies
npm install

# Link the command for global access (optional)
npm link

# Copy and configure environment variables
cp .env.example .env
# Edit .env to customize settings (see Configuration below)
```

## Usage

The primary way to use SlurpAI is by providing a starting URL. If you've linked the command globally (using `npm link`), you can use `slurp`:

```bash
# Scrape and compile documentation using the linked command
slurp https://example.com/docs/v1/ [--base-path https://example.com/docs/]
```

Alternatively, you can run the script directly using Node.js:

```bash
# Scrape and compile documentation using Node.js
node cli.js https://example.com/docs/v1/ [--base-path https://example.com/docs/]
```

This command will:
1. Start scraping from the provided URL (e.g., `https://example.com/docs/v1/`).
2. Follow internal links found on the pages. If `SLURP_ENFORCE_BASE_PATH` is set to `true` (the default is `false`), it will only follow links that start with the specified `--base-path` (or the starting URL if `--base-path` is omitted).
3. Convert the HTML content of scraped pages to Markdown, removing common navigation elements and other non-content sections.


4. Save intermediate Markdown files to a temporary directory (default: `slurp_partials/`).
5. Compile these partial files into a single Markdown file in the output directory (default: `slurp_docs/`). The filename will be based on the domain name (e.g., `example_docs.md`).

## Configuration (Optional)

You can customize SlurpAI's behavior by creating a `.env` file in the project root (copy `.env.example` to get started). Key options include:

| Variable                  | Default         | Description                                                              |
| ------------------------- | --------------- | ------------------------------------------------------------------------ |
| `SLURP_PARTIALS_DIR`      | `slurp_partials`| Directory for intermediate scraped markdown files (used as input for compile) |
| `SLURP_COMPILED_DIR`      | `compiled`      | Directory for the final compiled markdown file                           |
| `SLURP_MAX_PAGES_PER_SITE`| `20`            | Maximum pages to scrape per site (0 for unlimited)                       |
| `SLURP_CONCURRENCY`       | `10`            | Number of pages to process concurrently                                  |
| `SLURP_USE_HEADLESS`      | `true`          | Whether to use a headless browser (Puppeteer) for JS-rendered content    |
| `SLURP_ENFORCE_BASE_PATH` | `false`         | If `true`, only follow links starting with the effective `--base-path`     |
| `SLURP_REMOVE_DUPLICATES` | `true`          | Attempt to remove duplicate content sections during compilation          |
## Todo

- Check default values without .env and see what happens. Probably could be better.
    - currently SLURP_OUTPUT_DIR seems to be ignored and it's using 'compiled'
- Better logging around how many pages detected and accepted/denied and why.
- [x] Support separate parameters for `scrape_start_url` (main argument) and `--base-path`. Some sites require a distinction (e.g., `slurp https://mcp-framework.com/docs/introduction --base-path https://mcp-framework.com/docs/`). The `--base-path` is used for filtering links if `SLURP_ENFORCE_BASE_PATH=true`.
- Allow slurp to accept multiple urls to account and compile different folders if necessary in a single call.
- Build a command for locating a doc site via web search based on string / version number instead of url.
- Build a command for looking up exact code from an installed NPM package and converting the entire thing to function signatures to compile to a doc.
- Add MCP server.



| `SLURP_DELETE_PARTIALS`   | `true`          | Delete the intermediate `SLURP_PARTIALS_DIR` after successful compilation |

### Base Path Explanation

The main URL argument provided to `slurp` is the *starting point* for scraping. The optional `--base-path` flag defines a URL prefix used for *filtering* which discovered links are added to the scrape queue.

- If `--base-path` is **not** provided, it defaults to the starting URL.
- This filtering only occurs if the `SLURP_ENFORCE_BASE_PATH` environment variable is set to `true`. By default, it is `false`, meaning all same-domain links are followed regardless of path.

**Example:** To scrape only the `/docs/` section of a site starting from the introduction page:
```bash
# Set environment variable (or put in .env)
export SLURP_ENFORCE_BASE_PATH=true
# Run the command
slurp https://example.com/docs/introduction --base-path https://example.com/docs/
```
In this case, links like `https://example.com/docs/advanced` would be followed, but `https://example.com/blog/post` would be ignored.

*Note: The Brave Search API key mentioned in `.env.example` is **not** required for the direct URL scraping mode.*
## License

ISC
