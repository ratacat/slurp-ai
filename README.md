# SlurpAI

SlurpAI is a command-line tool that automatically scrapes web-based documentation from a given URL and converts it into a single, clean Markdown file optimized for AI consumption.

## Features

- **Direct URL Scraping**: Fetches content directly from a starting URL.
- **Markdown Conversion**: Transforms HTML documentation into clean, structured markdown using Turndown.
- **Content Cleanup**: Attempts to remove common navigation elements and other non-content sections.
- **Compilation**: Combines content from scraped pages into a single output file.
- **Configurable**: Options can be set via a `.env` file.

## Installation

```bash
# Clone the repository
# git clone https://github.com/yourusername/slurpai.git # Replace with actual repo URL later
cd slurpai

# Install dependencies
npm install

# Link the command for global access (optional)
npm link


# (Optional) Copy and configure environment variables
# cp .env.example .env
# Edit .env to customize settings (see Configuration below)
```

## Usage

The primary way to use SlurpAI is by providing a starting URL:

```bash
# Scrape and compile documentation from a URL
node cli.js https://example.com/docs/v1/
```

This command will:
1. Start scraping from the provided URL.
2. Follow links within the same domain (respecting filtering rules).
3. Convert the HTML content of scraped pages to Markdown.
4. Save intermediate Markdown files to a temporary directory (default: `slurp_partials/`).
5. Compile these partial files into a single Markdown file in the output directory (default: `compiled/`). The filename will be based on the domain name (e.g., `example_docs.md`).

## Configuration (Optional)

You can customize SlurpAI's behavior by creating a `.env` file in the project root (copy `.env.example` to get started). Key options include:

| Variable                  | Default         | Description                                                              |
| ------------------------- | --------------- | ------------------------------------------------------------------------ |
| `SLURP_OUTPUT_DIR`        | `slurp_partials`| Directory for intermediate scraped markdown files                        |
| `SLURP_COMPILED_DIR`      | `compiled`      | Directory for the final compiled markdown file                           |
| `SLURP_MAX_PAGES_PER_SITE`| `20`            | Maximum pages to scrape per site (0 for unlimited)                       |
| `SLURP_CONCURRENCY`       | `10`            | Number of pages to process concurrently                                  |
| `SLURP_USE_HEADLESS`      | `true`          | Whether to use a headless browser (Puppeteer) for JS-rendered content    |
| `SLURP_ENFORCE_BASE_PATH` | `true`          | Only follow links containing the base path of the starting URL           |
| `SLURP_REMOVE_DUPLICATES` | `true`          | Attempt to remove duplicate content sections during compilation          |
| `SLURP_DELETE_PARTIALS`   | `true`          | Delete the intermediate `SLURP_OUTPUT_DIR` after successful compilation |

*Note: The Brave Search API key mentioned in `.env.example` is **not** required for the direct URL scraping mode.*

## License

ISC
