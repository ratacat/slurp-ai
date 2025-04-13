# SlurpAI

SlurpAI is a CLI tool for scraping and compiling documentation from websites and NPM packages into markdown format. It's designed to be used as a starting point for AI agents to consume documentation via MCP (Model Context Protocol).

## Features

- **Direct URL Scraping**: Fetches content directly from a starting URL.
- **NPM Package Documentation**: Retrieves documentation for specific NPM packages and versions.
- **Markdown Conversion**: Transforms HTML documentation into clean, structured markdown using Turndown.
- **Content Cleanup**: Removes common navigation elements and other non-content sections.
- **Compilation**: Combines content from scraped pages into a single output file.
- **Configurable**: Options can be set via a `.env` file.
- **Asynchronous**: Uses async/await for better performance and scalability.

## Prerequisites

- Node.js v20 or later

## Installation

```bash
# Install globally from npm
npm install -g slurpai
```

Or locally in your project:

```bash
npm install slurpai
```

## Usage

### Scraping from a URL

```bash
# Scrape and compile documentation from a URL in one step
slurp https://expressjs.com/en/4.18/

# With base path option (for filtering links)
slurp https://example.com/docs/introduction --base-path https://example.com/docs/
```

### NPM Package Documentation

```bash
# Find and download documentation for a package
slurp fetch express 4.18.2

# Read local documentation for a package
slurp read express 4.18.2

# List all locally available documentation
slurp list

# Check all dependencies in a package.json file
slurp check ./package.json

# Remove documentation from cache
slurp purge express 4.18.2
```

### How It Works

When you run the URL scraping command, SlurpAI will:

1. Start scraping from the provided URL (e.g., `https://example.com/docs/v1/`).
2. Follow internal links found on the pages. If `SLURP_ENFORCE_BASE_PATH` is set to `true` (the default is `false`), it will only follow links that start with the specified `--base-path` (or the starting URL if `--base-path` is omitted).
3. Convert the HTML content of scraped pages to Markdown, removing common navigation elements and other non-content sections.
4. Save intermediate Markdown files to a temporary directory (default: `slurp_partials/`).
5. Compile these partial files into a single Markdown file in the output directory (default: `slurp_docs/`). The filename will be based on the domain name (e.g., `example_docs.md`).

## Configuration (Optional)

You can customize SlurpAI's behavior by creating a `.env` file in the project root. Key options include:

| Variable                  | Default         | Description                                                              |
| ------------------------- | --------------- | ------------------------------------------------------------------------ |
| `SLURP_PARTIALS_DIR`      | `slurps_partials`| Directory for intermediate scraped markdown files                        |
| `SLURP_COMPILED_DIR`      | `slurps`      | Directory for the final compiled markdown file                           |
| `SLURP_MAX_PAGES_PER_SITE`| `100`            | Maximum pages to scrape per site (0 for unlimited)                       |
| `SLURP_CONCURRENCY`       | `25`            | Number of pages to process concurrently                                  |
| `SLURP_USE_HEADLESS`      | `true`          | Whether to use a headless browser (Puppeteer) for JS-rendered content    |
| `SLURP_ENFORCE_BASE_PATH` | `false`         | If `true`, only follow links starting with the effective `--base-path`   |
| `SLURP_REMOVE_DUPLICATES` | `true`          | Attempt to remove duplicate content sections during compilation          |
| `SLURP_DELETE_PARTIALS`   | `true`          | Delete the intermediate partials directory after successful compilation  |

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

## MCP Server Integration

SlurpAI can also be used as an MCP (Model Context Protocol) server, allowing AI agents to interact with documentation efficiently.

## Contributing

Issues and pull requests are welcome! Please feel free to contribute to this project:

- Report issues: [https://github.com/jaredsmith/slurpai/issues](https://github.com/jaredsmith/slurpai/issues)
- Project repository: [https://github.com/jaredsmith/slurpai](https://github.com/jaredsmith/slurpai)

## License

ISC
