const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const yaml = require('js-yaml');

/**
 * MarkdownCompiler - A class to compile markdown files into a single document
 */
class MarkdownCompiler {
  /**
   * Create a new MarkdownCompiler
   * @param {Object} options - Configuration options
   * @param {string} options.inputDir - Directory containing markdown files (default: slurps_docs)
   * @param {string} options.outputFile - Output file path (default: compiled_docs.md)
   * @param {boolean} options.preserveMetadata - Whether to preserve metadata from frontmatter (default: true)
   * @param {boolean} options.removeNavigation - Whether to remove navigation links (default: true)
   * @param {boolean} options.removeDuplicates - Whether to remove duplicate content sections (default: true)
   * @param {number} options.similarityThreshold - Threshold for considering content as duplicate (0.0-1.0, default: 0.9)
   * @param {string} options.sortBy - How to sort files ('date', 'name', or null for no sorting) (default: null)
   * @param {string[]} options.includeLibraries - Array of library names to include (default: all)
   * @param {string[]} options.excludeLibraries - Array of library names to exclude (default: none)
   * @param {boolean} options.generateToc - Whether to generate a table of contents (default: false)
   * @param {RegExp[]} options.excludePatterns - Array of regex patterns to exclude (default: common patterns)
   */
  constructor(options = {}) {
    this.basePath = options.basePath || process.env.SLURP_BASE_PATH || process.cwd();
    this.inputDir = this.resolvePath(options.inputDir || process.env.SLURP_INPUT_DIR || 'slurps_docs');
    this.outputFile = this.resolvePath(options.outputFile || process.env.SLURP_OUTPUT_FILE || 'compiled_docs.md');
    
    this.preserveMetadata = options.preserveMetadata !== undefined ?
      options.preserveMetadata :
      (process.env.SLURP_PRESERVE_METADATA !== 'false');
      
    this.removeNavigation = options.removeNavigation !== undefined ?
      options.removeNavigation :
      (process.env.SLURP_REMOVE_NAVIGATION !== 'false');
      
    this.removeDuplicates = options.removeDuplicates !== undefined ?
      options.removeDuplicates :
      (process.env.SLURP_REMOVE_DUPLICATES !== 'false');
      
    this.similarityThreshold = options.similarityThreshold || 
      parseFloat(process.env.SLURP_SIMILARITY_THRESHOLD) || 0.9;
      
    this.sortBy = options.sortBy || process.env.SLURP_SORT_BY || null;
    this.includeLibraries = options.includeLibraries || 
      (process.env.SLURP_INCLUDE_LIBRARIES ? process.env.SLURP_INCLUDE_LIBRARIES.split(',') : null);
      
    this.excludeLibraries = options.excludeLibraries || 
      (process.env.SLURP_EXCLUDE_LIBRARIES ? process.env.SLURP_EXCLUDE_LIBRARIES.split(',') : []);
      
    this.generateToc = options.generateToc !== undefined ?
      options.generateToc :
      (process.env.SLURP_GENERATE_TOC === 'true');
    
    // Default exclude patterns for navigation elements and non-content sections
    this.excludePatterns = options.excludePatterns || [
      // Navigation elements
      /(?:^|\n)(?:#{1,6}\s*)?(?:\bOn this page\b|\bTable of contents\b|\bNavigation\b|\bContents\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,
      
      // Feedback elements
      /(?:^|\n)(?:#{1,6}\s*)?(?:Was this page helpful\?|\bFeedback\b|\bRate this page\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,
      
      // Common navigation links
      /(?:^|\n)(?:#{1,6}\s*)?(?:\bPrevious\b|\bNext\b)(?:\s*[:]\s*\[.*?\]\(.*?\))?[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,
      
      // Edit links
      /(?:^|\n)(?:#{1,6}\s*)?(?:\bEdit this page\b|\bEdit on GitHub\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,
      
      // Social sharing
      /(?:^|\n)(?:#{1,6}\s*)?(?:\bShare\b|\bTweet\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi,
      
      // Other common non-content elements
      /(?:^|\n)(?:#{1,6}\s*)?(?:\bRelated\b|\bSee also\b|\bFurther reading\b)[\s\S]*?(?=\n#{1,6}\s|\n$)/gi
    ];
    
    // Content hashes for duplicate detection
    this.contentHashes = new Set();
    
    // Statistics
    this.stats = {
      totalLibraries: 0,
      totalVersions: 0,
      totalFiles: 0,
      processedFiles: 0,
      skippedFiles: 0,
      duplicatesRemoved: 0
    };
  }

  /**
   * Resolve a path relative to the base path
   * @param {string} relativePath - Path relative to base
   * @returns {string} Absolute path
   */
  resolvePath(relativePath) {
    if (!relativePath) return this.basePath;
    
    // Handle absolute paths
    if (path.isAbsolute(relativePath)) {
      return relativePath;
    }
    
    // Handle home directory
    if (relativePath.startsWith('~')) {
      return path.join(
        os.homedir(),
        relativePath.substring(1)
      );
    }
    
    // Resolve relative to base path
    return path.join(this.basePath, relativePath);
  }

  /**
   * Compile all markdown files into a single document
   * @returns {Object} Compilation result with stats
   */
  async compile() {
    try {
      // Check if input directory exists
      if (!await fs.pathExists(this.inputDir)) {
        throw new Error(`Input directory not found: ${this.inputDir}`);
      }
      
      // Get all libraries (top-level directories)
      const libraries = await fs.readdir(this.inputDir);
      this.stats.totalLibraries = libraries.length;
      
      // Initialize output content
      let outputContent = `# Compiled Documentation\n\nGenerated on ${new Date().toISOString()}\n\n`;
      
      // Process each library
      for (const library of libraries) {
        const libraryPath = path.join(this.inputDir, library);
        
        // Skip if not a directory
        if (!(await fs.stat(libraryPath)).isDirectory()) {
          continue;
        }
        
        // Add library heading
        outputContent += `## ${library}\n\n`;
        
        // Get all versions for this library
        const versions = await fs.readdir(libraryPath);
        this.stats.totalVersions += versions.length;
        
        // Process each version
        for (const version of versions) {
          const versionPath = path.join(libraryPath, version);
          
          // Skip if not a directory
          if (!(await fs.stat(versionPath)).isDirectory()) {
            continue;
          }
          
          // Add version heading
          outputContent += `### Version ${version}\n\n`;
          
          // Get all markdown files for this version
          const files = await this.findMarkdownFiles(versionPath);
          this.stats.totalFiles += files.length;
          
          // Process each file
          for (const file of files) {
            const fileContent = await this.processFile(file, library, version);
            
            // Skip if file was filtered out (e.g., duplicate content)
            if (!fileContent) {
              this.stats.skippedFiles++;
              continue;
            }
            
            // Add file content to output
            outputContent += fileContent;
            this.stats.processedFiles++;
          }
        }
      }
      
      // Write output file
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
   * Find all markdown files in a directory recursively
   * @param {string} dir - Directory to search
   * @returns {Promise<string[]>} Array of file paths
   */
  async findMarkdownFiles(dir) {
    const files = await fs.readdir(dir);
    const markdownFiles = [];
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        // Recursively search subdirectories
        const subFiles = await this.findMarkdownFiles(filePath);
        markdownFiles.push(...subFiles);
      } else if (file.endsWith('.md')) {
        // Add markdown files
        markdownFiles.push(filePath);
      }
    }
    
    return markdownFiles;
  }

  /**
   * Process a markdown file
   * @param {string} filePath - Path to the markdown file
   * @param {string} library - Library name
   * @param {string} version - Library version
   * @returns {Promise<string|null>} Processed content or null if skipped
   */
  async processFile(filePath, library, version) {
    try {
      // Read file content
      const content = await fs.readFile(filePath, 'utf8');
      
      // Extract frontmatter and content
      const { frontmatter, markdown } = this.extractFrontmatter(content);
      
      // Clean up content
      const cleanedContent = this.cleanupContent(markdown);
      
      // Skip if content is empty after cleanup
      if (!cleanedContent.trim()) {
        return null;
      }
      
      // Check for duplicate content if enabled
      if (this.removeDuplicates) {
        const contentHash = this.hashContent(cleanedContent);
        
        if (this.contentHashes.has(contentHash)) {
          this.stats.duplicatesRemoved++;
          return null;
        }
        
        this.contentHashes.add(contentHash);
      }
      
      // Format the output
      const fileName = path.basename(filePath);
      let output = `#### ${fileName}\n\n`;
      
      // Add metadata if enabled
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
      
      // Add content
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
    
    // Apply exclude patterns if navigation removal is enabled
    if (this.removeNavigation) {
      for (const pattern of this.excludePatterns) {
        cleaned = cleaned.replace(pattern, '');
      }
    }
    
    // Apply general cleanup
    cleaned = cleaned
      // Fix navigation elements with excessive whitespace
      .replace(/\*\s+\[\s+\n+\s+([^\n]+)\s+\n+\s+\n+\s+\n+\s+\]\(([^)]+)\)/g, '* [$1]($2)')
      
      // Clean up excessive blank lines
      .replace(/\n{3,}/g, '\n\n')
      
      // Ensure proper spacing around headings
      .replace(/\n{2,}(#{1,6}\s)/g, '\n\n$1')
      .replace(/^(#{1,6}\s.*)\n{3,}/gm, '$1\n\n')
      
      // Fix list formatting
      .replace(/\n{2,}(\*\s)/g, '\n$1')
      .replace(/(\*\s.*)\n{2,}(\*\s)/g, '$1\n$2')
      
      // Clean up code blocks
      .replace(/```\n{2,}/g, '```\n')
      .replace(/\n{2,}```/g, '\n```')
      
      // Remove empty list items
      .replace(/\*\s*\n\s*\*/g, '*')
      
      // Trim leading/trailing whitespace
      .trim();
    
    return cleaned;
  }

  /**
   * Generate a hash for content to detect duplicates
   * @param {string} content - Content to hash
   * @returns {string} Content hash
   */
  hashContent(content) {
    // Extract headings and core content sections
    const headings = [];
    const contentSections = [];
    
    // Extract all headings (level 1-3)
    const headingMatches = content.match(/^#{1,3}\s+(.+)$/gm);
    if (headingMatches) {
      headingMatches.forEach(heading => {
        // Normalize heading and add to list
        const normalizedHeading = heading
          .replace(/^#+\s+/, '') // Remove # symbols
          .toLowerCase()
          .trim();
        headings.push(normalizedHeading);
      });
    }
    
    // Extract content sections (paragraphs between headings)
    const sections = content.split(/^#{1,3}\s+.+$/m);
    sections.forEach(section => {
      if (section.trim()) {
        // Normalize section content
        const normalizedSection = section
          // Remove all whitespace
          .replace(/\s+/g, ' ')
          // Remove all markdown formatting
          .replace(/[#*_`~]/g, '')
          // Remove all links but keep text
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          // Remove all HTML tags
          .replace(/<[^>]+>/g, '')
          // Remove punctuation
          .replace(/[.,;:!?()[\]{}'"]/g, '')
          // Convert to lowercase
          .toLowerCase()
          .trim();
        
        // Only add non-empty sections
        if (normalizedSection) {
          contentSections.push(normalizedSection);
        }
      }
    });
    
    // Create a signature from headings and content sections
    const signature = {
      headings: headings,
      contentSections: contentSections
    };
    
    // Calculate similarity score based on headings and content sections
    const signatureStr = JSON.stringify(signature);
    
    // Generate hash
    return crypto.createHash('md5').update(signatureStr).digest('hex');
  }
}

module.exports = { MarkdownCompiler };
