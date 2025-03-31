# SlurpAI

SlurpAI is a documentation scraper for AI systems that automatically finds, fetches, and converts web-based documentation to markdown format optimized for AI consumption.

## Components

The system consists of four main components:

- **DocsToMarkdown**: Extracts content from documentation websites and converts it to clean, structured markdown
- **LocalRegistryLookup**: Provides quick lookup of documentation from the local registry
- **DocSlurper**: Discovers documentation for packages using web search (Brave Search API)
- **MarkdownCompiler**: Compiles all scraped markdown files into a single consolidated file, removing navigation elements and other non-content sections

## Features

- **Documentation Discovery**: Automatically finds documentation sites for packages
- **Web Search Integration**: Uses Brave Search API to locate relevant documentation
- **Version Matching**: Intelligently matches documentation to specific package versions
- **Confidence Levels**: Indicates exact, close, or unknown version matches
- **Markdown Conversion**: Transforms HTML documentation into clean, structured markdown
- **Context Building**: Creates optimized context from docs and source code
- **Hierarchical Storage**: Organizes documentation by library and version
- **Documentation Compilation**: Combines all scraped markdown files into a single consolidated file
- **Content Cleanup**: Removes navigation elements, empty spaces, and other non-content elements
- **Duplicate Detection**: Identifies and removes duplicate content sections

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

# Compile all documentation into a single file
node compile.js

# Compile with custom options
node compile.js --input ./slurps_docs --output ./compiled_docs.md --preserve-metadata false
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

### Scraper Configuration

SlurpAI can be configured with the following parameters:

| Option | Default | Description |
|--------|---------|-------------|
| Output Directory | `./slurps_docs` | Directory to save markdown files |
| Max Pages | `20` | Maximum number of pages to scrape per documentation site |
| Concurrency | `5` | Number of pages to process concurrently |
| Headless Mode | `true` | Whether to use headless browser for JavaScript-rendered content |
| Enforce Base Path | `true` | Ensures URLs contain the base path (e.g., `/docs/0.15/`) |
| URL Blacklist | *See code* | Patterns to skip (e.g., `/blog/`, `/about/`) |
| Query Params to Keep | *See code* | Query parameters to preserve (e.g., `version`, `lang`) |

### Compiler Configuration

The markdown compiler can be configured with these options:

| Option | Default | Description |
|--------|---------|-------------|
| Input Directory | `./slurps_docs` | Directory containing the scraped markdown files |
| Output File | `./compiled_docs.md` | Path to the output file |
| Preserve Metadata | `true` | Whether to preserve metadata from the frontmatter |
| Remove Navigation | `true` | Whether to remove navigation links |
| Remove Duplicates | `true` | Whether to remove duplicate content sections |
| Exclude Patterns | *See code* | Regex patterns to exclude from the compiled markdown |

## URL Filtering

SlurpAI implements intelligent URL filtering to ensure high-quality documentation scraping:

### Base Path Enforcement

When enabled, this feature ensures that all scraped URLs contain the base path from the initial URL. For example, if scraping starts at `https://moleculer.services/docs/0.15/`, only URLs containing `/docs/0.15/` will be followed. This prevents the scraper from wandering into unrelated sections of the site.

```javascript
// Example configuration
const scraper = new DocsToMarkdown({
  baseUrl: 'https://moleculer.services/docs/0.15/',
  enforceBasePath: true  // Only follow URLs containing /docs/0.15/
});
```

### URL Blacklist

The scraper automatically filters out URLs containing patterns that typically lead to non-documentation content:

- Common non-documentation pages: `/blog/`, `/news/`, `/about/`, `/contact/`, etc.
- Social media and external services: `/twitter/`, `/github.com/`, `/discord/`, etc.
- E-commerce/marketing: `/store/`, `/pricing/`, `/subscribe/`, etc.
- User account related: `/login/`, `/account/`, `/profile/`, etc.
- Support/feedback: `/support/`, `/help-center/`, `/faq/`, etc.

You can customize this list:

```javascript
// Example configuration with custom blacklist
const scraper = new DocsToMarkdown({
  baseUrl: 'https://example.com/docs/',
  urlBlacklist: ['/blog/', '/forum/', '/download/']  // Custom patterns to skip
});
```

### Query Parameter Handling

Many documentation sites use query parameters that aren't relevant to the content (tracking parameters, session IDs, etc.). SlurpAI preserves only meaningful parameters while discarding others to avoid duplicate content:

Parameters preserved by default:
- Version related: `version`, `v`, `ver`
- Language/localization: `lang`, `locale`, `language`
- Content display: `theme`, `view`, `format`
- API specific: `api-version`, `endpoint`, `namespace`
- Documentation specific: `section`, `chapter`, `topic`, etc.

```javascript
// Example configuration with custom query parameters to keep
const scraper = new DocsToMarkdown({
  baseUrl: 'https://example.com/docs/',
  queryParamsToKeep: ['version', 'lang', 'example']  // Custom parameters to preserve
});
```

## License

ISC
