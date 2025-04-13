import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';
import yaml from 'js-yaml';
import { resolvePath } from './utils/pathUtils.js';
import { cleanupMarkdown as sharedCleanupMarkdown } from './utils/markdownUtils.js';
import config, { paths, compilation } from '../config.js';
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
    // Default input dir from config
    this.inputDir = resolvePath(options.inputDir || paths.inputDir, this.basePath);
    // Default output file path using config values
    this.outputFile = resolvePath(options.outputFile || path.join(paths.outputDir, 'compiled_docs.md'), this.basePath);
    
    this.preserveMetadata = options.preserveMetadata !== undefined ?
      options.preserveMetadata :
      compilation.preserveMetadata;
      
    this.removeNavigation = options.removeNavigation !== undefined ?
      options.removeNavigation :
      compilation.removeNavigation;
      
    this.removeDuplicates = options.removeDuplicates !== undefined ?
      options.removeDuplicates :
      compilation.removeDuplicates;
      
      
    
    this.excludePatterns = options.excludePatterns || [
      /(?:^|\n)(?:#{1,6}\s*)?(?:\bOn this page\b|\bTable of contents\b|\bNavigation\b|\bContents\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,
      
      /(?:^|\n)(?:#{1,6}\s*)?(?:Was this page helpful\?|\bFeedback\b|\bRate this page\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,
      
      /(?:^|\n)(?:#{1,6}\s*)?(?:\bPrevious\b|\bNext\b)(?:\s*[:]\s*\[.*?\]\(.*?\))?[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,
      
      /(?:^|\n)(?:#{1,6}\s*)?(?:\bEdit this page\b|\bEdit on GitHub\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,
      
      /(?:^|\n)(?:#{1,6}\s*)?(?:\bShare\b|\bTweet\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,
      
      /(?:^|\n)(?:#{1,6}\s*)?(?:\bRelated\b|\bSee also\b|\bFurther reading\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi
    ];
    
    this.contentHashes = new Set();
    
    this.stats = {
      totalFiles: 0,
      processedFiles: 0,
      skippedFiles: 0,
      duplicatesRemoved: 0
    };
  }

  /**
   * Compile all markdown files into a single document
   * @returns {Object} Compilation result with stats
   */
  async compile() {
    try {
      if (!await fs.pathExists(this.inputDir)) {
        throw new Error(`Input directory not found: ${this.inputDir}`);
      }
      
      let outputContent = `# Compiled Documentation\n\nGenerated on ${new Date().toISOString()}\n\n`;
      
      const processedContent = await this.processDirectoryContent(this.inputDir);
      outputContent += processedContent;
      
      await fs.ensureDir(path.dirname(this.outputFile));
      await fs.writeFile(this.outputFile, outputContent);
      
      return {
        outputFile: this.outputFile,
        stats: this.stats
      };
    } catch (error) {
      console.error('Compilation error:', error);
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
    
    const markdownFiles = entries.filter(entry =>
      entry.endsWith('.md') && fs.statSync(path.join(dir, entry)).isFile()
    );
    
    this.stats.totalFiles += markdownFiles.length;
    
    for (const file of markdownFiles) {
      const filePath = path.join(dir, file);
      const fileContent = await this.processFile(filePath);
      
      if (fileContent) {
        content += fileContent;
        this.stats.processedFiles++;
      } else {
        this.stats.skippedFiles++;
      }
    }
    
    const subdirs = entries.filter(entry =>
      fs.statSync(path.join(dir, entry)).isDirectory()
    );
    
    for (const subdir of subdirs) {
      const subdirPath = path.join(dir, subdir);
      const newRelativePath = path.join(relativePath, subdir);
      
      const subdirContent = await this.processDirectoryContent(
        subdirPath,
        level + 1,
        newRelativePath
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
      
      const { frontmatter, markdown } = this.extractFrontmatter(content);
      
      const cleanedContent = this.cleanupContent(markdown);
      
      if (!cleanedContent.trim()) {
        return null;
      }
      
      if (this.removeDuplicates) {
        const contentHash = this.hashContent(cleanedContent);
        
        if (this.contentHashes.has(contentHash)) {
          this.stats.duplicatesRemoved++;
          return null;
        }
        
        this.contentHashes.add(contentHash);
      }
      
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
      console.error(`Error processing file ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Extract frontmatter and content from markdown
   * @param {string} content - Raw file content
   * @returns {Object} Object with frontmatter and markdown
   */
  extractFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (match) {
      try {
        const frontmatter = yaml.load(match[1]);
        const markdown = match[2];
        return { frontmatter, markdown };
      } catch (error) {
        console.error('Error parsing frontmatter:', error);
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

    if (this.removeNavigation) {
      for (const pattern of this.excludePatterns) {
        cleaned = cleaned.replace(pattern, '');
      }
    }

    cleaned = sharedCleanupMarkdown(cleaned);


    return cleaned;
  }

  /**
   * Generate a hash for content to detect duplicates
   * @param {string} content - Content to hash
   * @returns {string} Content hash
   */
  hashContent(content) {
    const headings = [];
    const contentSections = [];
    
    const headingMatches = content.match(/^#{1,3}\s+(.+)$/gm);
    if (headingMatches) {
      headingMatches.forEach(heading => {
        const normalizedHeading = heading
          .replace(/^#+\s+/, '')
          .toLowerCase()
          .trim();
        headings.push(normalizedHeading);
      });
    }
    
    const sections = content.split(/^#{1,3}\s+.+$/m);
    sections.forEach(section => {
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
      headings: headings,
      contentSections: contentSections
    };
    
    const signatureStr = JSON.stringify(signature);
    
    return crypto.createHash('md5').update(signatureStr).digest('hex');
  }
}

export { MarkdownCompiler };
