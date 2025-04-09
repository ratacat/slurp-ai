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
slurp https://example.com/docs/v1/
```

Alternatively, you can run the script directly using Node.js:

```bash
# Scrape and compile documentation using Node.js
node cli.js https://example.com/docs/v1/
```

This command will:
1. Start scraping from the provided URL (e.g., `https://example.com/docs/v1/`).
2. Follow internal links found on the pages. By default (`SLURP_ENFORCE_BASE_PATH=true`), it will only follow links that share the same base path as the starting URL (e.g., links starting with `https://example.com/docs/v1/`). It also respects other filtering rules defined in the configuration.
3. Convert the HTML content of scraped pages to Markdown, and remove common navigation elements and other non-content sections.
| `SLURP_COMPILED_DIR`      | `compiled`      | Directory for the final compiled markdown file                           |

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
| `SLURP_ENFORCE_BASE_PATH` | `true`          | Only follow links containing the base path of the starting URL           |
| `SLURP_REMOVE_DUPLICATES` | `true`          | Attempt to remove duplicate content sections during compilation          |
## Todo

- Check default values without .env and see what happens. Probably could be better.
    - currently SLURP_OUTPUT_DIR seems to be ignored and it's using 'compiled'
- Better logging around how many pages detected and accepted/denied and why.
- Allow slurp to accept multiple urls to account and compile different folders if necessary in a single call.
- Build a command for locating a doc site via web search based on string / version number instead of url.
- Build a command for looking up exact code from an installed NPM package and converting the entire thing to function signatures to compile to a doc.
- Add MCP server.


| `SLURP_DELETE_PARTIALS`   | `true`          | Delete the intermediate `SLURP_OUTPUT_DIR` after successful compilation |

*Note: The Brave Search API key mentioned in `.env.example` is **not** required for the direct URL scraping mode.*

## License

ISC
