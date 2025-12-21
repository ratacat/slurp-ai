import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';
import yaml from 'js-yaml';
import { resolvePath } from './utils/pathUtils.js';
import { cleanupMarkdown as sharedCleanupMarkdown } from './utils/markdownUtils.js';
import { paths, compilation } from '../config.js';
import { log } from './utils/logger.js';
/**
 * MarkdownCompiler - A class to compile markdown files into a single document
 */
class MarkdownCompiler {
  /**
   * Create a new MarkdownCompiler
   * @param {Object} options - Configuration options
   * @param {string} options.inputDir - Directory containing markdown files (default: slurp_partials)
   * @param {string} options.outputFile - Output file path (default: slurp_compiled/compiled_docs.md)
   * @param {boolean} options.preserveMetadata - Whether to preserve metadata from frontmatter (default: true)
   * @param {boolean} options.removeNavigation - Whether to remove navigation links (default: true)
   * @param {boolean} options.removeDuplicates - Whether to remove duplicate content sections (default: true)
   * @param {RegExp[]} options.excludePatterns - Array of regex patterns to exclude (default: common patterns)
   */
  constructor(options = {}) {
    this.basePath = options.basePath || paths.basePath;
    this.inputDir = resolvePath(
      options.inputDir || paths.inputDir,
      this.basePath,
    );
    this.outputFile = resolvePath(
      options.outputFile || path.join(paths.outputDir, 'compiled_docs.md'),
      this.basePath,
    );

    this.preserveMetadata =
      options.preserveMetadata !== undefined
        ? options.preserveMetadata
        : compilation.preserveMetadata;

    this.removeNavigation =
      options.removeNavigation !== undefined
        ? options.removeNavigation
        : compilation.removeNavigation;

    this.removeDuplicates =
      options.removeDuplicates !== undefined
        ? options.removeDuplicates
        : compilation.removeDuplicates;

    this.excludePatterns = options.excludePatterns || [
      /(?:^|\n)(?:#{1,6}\s*)?(?:\bOn this page\b|\bTable of contents\b|\bNavigation\b|\bContents\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,

      /(?:^|\n)(?:#{1,6}\s*)?(?:Was this page helpful\?|\bFeedback\b|\bRate this page\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,

      /(?:^|\n)(?:#{1,6}\s*)?(?:\bPrevious\b|\bNext\b)(?:\s*[:]\s*\[.*?\]\(.*?\))?[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,

      /(?:^|\n)(?:#{1,6}\s*)?(?:\bEdit this page\b|\bEdit on GitHub\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,

      /(?:^|\n)(?:#{1,6}\s*)?(?:\bShare\b|\bTweet\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,

      /(?:^|\n)(?:#{1,6}\s*)?(?:\bRelated\b|\bSee also\b|\bFurther reading\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,
    ];

    this.contentHashes = new Set();

    this.stats = {
      totalFiles: 0,
      processedFiles: 0,
      skippedFiles: 0,
      duplicatesRemoved: 0,
      rawTokens: 0,
      cleanedTokens: 0,
      navTokensRemoved: 0,
      duplicateTokensRemoved: 0,
    };
  }

  /**
   * Estimate token count for text (approximation: ~4 chars per token)
   * @param {string} text - Text to count tokens for
   * @returns {number} Estimated token count
   */
  static estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
  }

  /**
   * Set metadata for the compiled document header
   * @param {object} metadata - Metadata object
   * @param {string} metadata.url - Source URL
   * @param {string} metadata.title - Document title
   * @param {string} [metadata.version] - Detected version
   */
  setMetadata(metadata) {
    this.metadata = metadata;
  }

  /**
   * Compile all markdown files into a single document
   * @returns {Object} Compilation result with stats
   */
  async compile() {
    try {
      if (!(await fs.pathExists(this.inputDir))) {
        throw new Error(`Input directory not found: ${this.inputDir}`);
      }

      // Process content first to get accurate token stats
      const processedContent = await this.processDirectoryContent(
        this.inputDir,
      );

      // Build header with metadata
      const scrapeDate = new Date().toISOString();
      let headerLines = ['---'];

      if (this.metadata?.title) {
        headerLines.push(`title: "${this.metadata.title}"`);
      }
      if (this.metadata?.url) {
        headerLines.push(`source: "${this.metadata.url}"`);
      }
      if (this.metadata?.version) {
        headerLines.push(`version: "${this.metadata.version}"`);
      }
      headerLines.push(`scraped: "${scrapeDate}"`);
      headerLines.push(`tokens: ${this.stats.cleanedTokens}`);
      headerLines.push('---');
      headerLines.push('');

      // Build the document
      const title = this.metadata?.title || 'Compiled Documentation';
      let outputContent = headerLines.join('\n');
      outputContent += `# ${title}\n\n`;

      if (this.metadata?.version) {
        outputContent += `> Version: ${this.metadata.version}\n`;
      }
      if (this.metadata?.url) {
        outputContent += `> Source: ${this.metadata.url}\n`;
      }
      outputContent += `> Generated: ${new Date().toLocaleString()}\n\n`;

      outputContent += processedContent;

      await fs.ensureDir(path.dirname(this.outputFile));
      await fs.writeFile(this.outputFile, outputContent);

      return {
        outputFile: this.outputFile,
        stats: this.stats,
      };
    } catch (error) {
      log.error('Compile', `Compilation error: ${error}`);
      throw error;
    }
  }

  /**
   * Process a directory's content recursively
   * @param {string} dir - Directory to process
   * @param {number} level - Current heading level (starts at 2)
   * @param {string} relativePath - Path relative to input directory
   * @returns {Promise<string>} Processed content
   */
  async processDirectoryContent(dir, level = 2, relativePath = '') {
    let content = '';

    const entries = await fs.readdir(dir);

    if (relativePath) {
      const dirName = path.basename(dir);
      content += `${'#'.repeat(Math.min(level, 6))} ${dirName}\n\n`;
    }

    const markdownFiles = entries.filter(
      (entry) =>
        entry.endsWith('.md') && fs.statSync(path.join(dir, entry)).isFile(),
    );

    this.stats.totalFiles += markdownFiles.length;

    // Use traditional for loop for sequential async operations
    for (let i = 0; i < markdownFiles.length; i += 1) {
      const file = markdownFiles[i];
      const filePath = path.join(dir, file);
      // eslint-disable-next-line no-await-in-loop
      const fileContent = await this.processFile(filePath);

      if (fileContent) {
        content += fileContent;
        this.stats.processedFiles += 1;
      } else {
        this.stats.skippedFiles += 1;
      }
    }

    const subdirs = entries.filter((entry) =>
      fs.statSync(path.join(dir, entry)).isDirectory(),
    );

    // Use traditional for loop for sequential async operations
    for (let i = 0; i < subdirs.length; i += 1) {
      const subdir = subdirs[i];
      const subdirPath = path.join(dir, subdir);
      const newRelativePath = path.join(relativePath, subdir);

      // eslint-disable-next-line no-await-in-loop
      const subdirContent = await this.processDirectoryContent(
        subdirPath,
        level + 1,
        newRelativePath,
      );

      content += subdirContent;
    }

    return content;
  }

  /**
   * Process a markdown file
   * @param {string} filePath - Path to the markdown file
   * @param {string} library - Library name
   * @param {string} version - Library version
   * @returns {Promise<string|null>} Processed content or null if skipped
   */
  async processFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');

      const { frontmatter, markdown } =
        MarkdownCompiler.extractFrontmatter(content);

      // Track raw tokens before cleanup
      const rawTokens = MarkdownCompiler.estimateTokens(markdown);
      this.stats.rawTokens += rawTokens;

      const cleanedContent = this.cleanupContent(markdown);

      // Track cleaned tokens
      const cleanedTokens = MarkdownCompiler.estimateTokens(cleanedContent);

      if (!cleanedContent.trim()) {
        return null;
      }

      if (this.removeDuplicates) {
        const contentHash = MarkdownCompiler.hashContent(cleanedContent);

        if (this.contentHashes.has(contentHash)) {
          this.stats.duplicatesRemoved += 1;
          this.stats.duplicateTokensRemoved += cleanedTokens;
          return null;
        }

        this.contentHashes.add(contentHash);
      }

      // Only count tokens that make it to final output
      this.stats.cleanedTokens += cleanedTokens;

      const fileName = path.basename(filePath);
      let output = `#### ${fileName}\n\n`;

      if (this.preserveMetadata && frontmatter) {
        if (frontmatter.url) {
          output += `> Source: ${frontmatter.url}\n`;
        }

        if (frontmatter.scrapeDate) {
          const date = new Date(frontmatter.scrapeDate);
          output += `> Scraped: ${date.toLocaleString()}\n`;
        }

        output += `\n`;
      }

      output += `${cleanedContent}\n\n`;

      return output;
    } catch (error) {
      log.error('Compile', `Error processing file ${filePath}: ${error}`);
      return null;
    }
  }

  /**
   * Extract frontmatter and content from markdown
   * @param {string} content - Raw file content
   * @returns {Object} Object with frontmatter and markdown
   */
  static extractFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (match) {
      try {
        const frontmatter = yaml.load(match[1]);
        const markdown = match[2];
        return { frontmatter, markdown };
      } catch (error) {
        log.error('Compile', `Error parsing frontmatter: ${error}`);
        return { frontmatter: null, markdown: content };
      }
    }

    return { frontmatter: null, markdown: content };
  }

  /**
   * Clean up markdown content
   * @param {string} content - Markdown content
   * @returns {string} Cleaned content
   */
  cleanupContent(content) {
    let cleaned = content;
    const beforeNavTokens = MarkdownCompiler.estimateTokens(cleaned);

    if (this.removeNavigation) {
      this.excludePatterns.forEach((pattern) => {
        cleaned = cleaned.replace(pattern, '');
      });
    }

    const afterNavTokens = MarkdownCompiler.estimateTokens(cleaned);
    this.stats.navTokensRemoved += beforeNavTokens - afterNavTokens;

    cleaned = sharedCleanupMarkdown(cleaned);

    return cleaned;
  }

  /**
   * Generate a hash for content to detect duplicates
   * @param {string} content - Content to hash
   * @returns {string} Content hash
   */
  static hashContent(content) {
    const headings = [];
    const contentSections = [];

    const headingMatches = content.match(/^#{1,3}\s+(.+)$/gm);
    if (headingMatches) {
      headingMatches.forEach((heading) => {
        const normalizedHeading = heading
          .replace(/^#+\s+/, '')
          .toLowerCase()
          .trim();
        headings.push(normalizedHeading);
      });
    }

    const sections = content.split(/^#{1,3}\s+.+$/m);
    sections.forEach((section) => {
      if (section.trim()) {
        const normalizedSection = section
          .replace(/\s+/g, ' ')
          .replace(/[#*_`~]/g, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/<[^>]+>/g, '')
          .replace(/[.,;:!?()[\]{}'"]/g, '')
          .toLowerCase()
          .trim();

        if (normalizedSection) {
          contentSections.push(normalizedSection);
        }
      }
    });

    const signature = {
      headings,
      contentSections,
    };

    const signatureStr = JSON.stringify(signature);

    return crypto.createHash('md5').update(signatureStr).digest('hex');
  }
}

export { MarkdownCompiler };
