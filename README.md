# SlurpAI

SlurpAI is a documentation scraper for AI systems that automatically finds, fetches, and converts web-based documentation to markdown format optimized for AI consumption.

## Components

The system consists of three main components:

- **DocsToMarkdown**: Extracts content from documentation websites and converts it to clean, structured markdown
- **LocalRegistryLookup**: Provides quick lookup of documentation from the local registry
- **DocSlurper**: Discovers documentation for packages using web search (Brave Search API)

## Features

- **Documentation Discovery**: Automatically finds documentation sites for packages
- **Web Search Integration**: Uses Brave Search API to locate relevant documentation
- **Version Matching**: Intelligently matches documentation to specific package versions
- **Confidence Levels**: Indicates exact, close, or unknown version matches
- **Markdown Conversion**: Transforms HTML documentation into clean, structured markdown
- **Context Building**: Creates optimized context from docs and source code
- **Hierarchical Storage**: Organizes documentation by library and version

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/slurpai.git
cd slurpai

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Add your Brave Search API key to .env
```

## API Key Setup

SlurpAI uses the Brave Search API for documentation discovery. You'll need to:

1. Sign up for a free Brave Search API key at: https://brave.com/search/api/
2. Add your key to the `.env` file:
   ```
   BRAVE_API_KEY=your-api-key-here
   ```

## Usage

### CLI Interface

```bash
# Find and download documentation for a package
node slurp.js fetch express 4.18.2

# Read local documentation for a package
node slurp.js read express 4.18.2

# List all locally available documentation
node slurp.js list

# Check all dependencies in a package.json file
node slurp.js check ./package.json

# Remove documentation from cache
node slurp.js purge express 4.18.2
```

### Testing

The repository includes test scripts to verify functionality:

```bash
# Test the documentation converter
node test.js

# Test the local registry lookup
node test-registry-lookup.js

# Test the documentation slurper (requires Brave API key)
node test-slurper.js --fallback-only  # Use only local registry (no API calls)
```

## Documentation Storage

SlurpAI stores documentation in a hierarchical structure:

```
slurps_docs/
└── [library-name]/
    └── [version]/
        └── markdown files
```

A registry file maintains metadata about available documentation:

```json
{
  "packages": {
    "express": {
      "versions": {
        "4.18.2": {
          "documentationUrls": [
            {
              "url": "https://expressjs.com/en/4.18/",
              "type": "official",
              "confidence": "EXACT"
            }
          ],
          "lastUpdated": "2025-03-28T14:45:00.000Z"
        }
      },
      "registryUrl": "https://www.npmjs.com/package/express",
      "repositoryUrl": "https://github.com/expressjs/express"
    }
  }
}
```

## Configuration

SlurpAI can be configured with the following parameters:

| Option | Default | Description |
|--------|---------|-------------|
| Output Directory | `./slurps_docs` | Directory to save markdown files |
| Max Pages | `20` | Maximum number of pages to scrape per documentation site |
| Concurrency | `5` | Number of pages to process concurrently |
| Headless Mode | `true` | Whether to use headless browser for JavaScript-rendered content |

## License

ISC
