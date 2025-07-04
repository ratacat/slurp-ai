# SlurpAI

SlurpAI is a CLI tool for scraping and compiling documentation from websites and NPM packages into markdown format. It's designed to be used as a starting point for AI agents to consume documentation via MCP (Model Context Protocol). Including relevant docs in your context helps your coding agents make less mistakes and hallucinations, reducing the amount of time you spend debugging and fighting errors.  SlurpAI is very resource efficient, and fast, it is FOR ai, it does NOT use ai to scrape.

## Alternative to Context7
Slurp AI is a lightweight alternative to other AI context tools such as Context7. Whereas Context7 will pull large numbers of docs, SlurpAI allows you to manually save the docs you need, and only include them when you want them, using only as much context as you require, and preserving the rest will help your implmentation phase be more effective. AI coding agentics make more mistakes the more full their context is.

## Features

- **Direct URL Scraping**: Fetches content directly from a starting URL.
- **NPM Package Documentation**: Retrieves documentation for specific NPM packages and versions.
- **Markdown Conversion**: Transforms HTML documentation into clean, structured markdown using Turndown.
- **Content Cleanup**: Removes common navigation elements and other non-content sections.
- **Compilation**: Combines content from scraped pages into a single output file.
- **Configurable**: Options can be set via the `config.js` file.
- **Asynchronous**: Uses async/await for better performance and scalability.
- **No Use of AI**: For scraping, just nodejs, lightweight and works well.

## Prerequisites

- Node.js v20 or later

## Installation

```bash
# Install globally from npm
npm install -g slurp-ai
```

## Usage

### Scraping from a URL

```bash
# Scrape and compile documentation from a URL in one step
slurp https://expressjs.com/en/4.18/

# With base path option (for filtering links)
slurp https://example.com/docs/introduction --base-path https://example.com/docs/
```

### How It Works

When you run the URL scraping command, SlurpAI will:

1. Start scraping from the provided URL (e.g., `https://example.com/docs/v1/`).
2. Follow internal links found on the pages. If `SLURP_ENFORCE_BASE_PATH` is set to `true` (the default is `false`), it will only follow links that start with the specified `--base-path` (or the starting URL if `--base-path` is omitted).
3. Convert the HTML content of scraped pages to Markdown, removing common navigation elements and other non-content sections.
4. Save intermediate Markdown files to a temporary directory (default: `slurp_partials/`).
5. Compile these partial files into a single Markdown file in the output directory (default: `slurps/`). The filename will be based on the domain name (e.g., `example_docs.md`).

## Configuration (Optional)

You can customize SlurpAI's behavior by modifying the `config.js` file in the project root. Configuration is organized into logical sections:

### File System Paths

| Property    | Default           | Description                                       |
| ----------- | ----------------- | ------------------------------------------------- |
| `inputDir`  | `slurps_partials` | Directory for intermediate scraped markdown files |
| `outputDir` | `slurps`          | Directory for the final compiled markdown file    |
| `basePath`  | <targetUrl>       | Base path used for link filtering (if specified)  |

### Web Scraping Settings

| Property          | Default | Description                                        |
| ----------------- | ------- | -------------------------------------------------- |
| `maxPagesPerSite` | `100`   | Maximum pages to scrape per site (0 for unlimited) |
| `concurrency`     | `25`    | Number of pages to process concurrently            |
| `retryCount`      | `3`     | Number of times to retry failed requests           |
| `retryDelay`      | `1000`  | Delay between retries in milliseconds              |
| `useHeadless`     | `false` | Whether to use a headless browser for JS-rendering |
| `timeout`         | `60000` | Request timeout in milliseconds                    |

### URL Filtering

| Property              | Default                        | Description                                            |
| --------------------- | ------------------------------ | ------------------------------------------------------ |
| `enforceBasePath`     | `true`                         | Only follow links starting with the effective basePath |
| `preserveQueryParams` | `['version', 'lang', 'theme']` | Query parameters to preserve when normalizing URLs     |

### Markdown Compilation

| Property              | Default | Description                                           |
| --------------------- | ------- | ----------------------------------------------------- |
| `preserveMetadata`    | `true`  | Preserve metadata blocks in markdown                  |
| `removeNavigation`    | `true`  | Remove navigation elements from content               |
| `removeDuplicates`    | `true`  | Attempt to remove duplicate content sections          |
| `similarityThreshold` | `0.9`   | Threshold for considering content sections duplicates |

### Base Path Explanation

The main URL argument provided to `slurp` is the _starting point_ for scraping. The optional `--base-path` flag defines a URL prefix used for _filtering_ which discovered links are added to the scrape queue.

- If `--base-path` is **not** provided, it defaults to the starting URL, and Slurp will grab all pages that
  include the starting url in their url string. Sometimes you may want to use different starting pages and base path.

**Example:** To scrape only the `/docs/` section of a site BUT starting from the introduction page:

```bash
# Modify config.js to set enforceBasePath to true
# In config.js:
# urlFiltering: {
#   enforceBasePath: true,
#   ...
# }

# Then run the command
slurp https://example.com/docs/introduction --base-path https://example.com/docs/
```

In this case, links like `https://example.com/docs/advanced` would be followed, but `https://example.com/blog/post` would be ignored.
This is often used if the base path itself returns a 404 when you try and load it.

## MCP Server Integration

SlurpAI MCP is in testing, it's included in this release. 

## Contributing

Issues and pull requests are welcome! Please feel free to contribute to this project:

- Report issues: [https://github.com/ratacat/slurpai/issues](https://github.com/ratacat/slurpai/issues)
- Project repository: [https://github.com/ratacat/slurpai](https://github.com/ratacat/slurpai)

## License

ISC
