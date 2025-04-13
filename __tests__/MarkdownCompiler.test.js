// __tests__/MarkdownCompiler.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import path from 'path';
import { MarkdownCompiler } from '../src/MarkdownCompiler.js'; // Adjust path as needed

// --- Mock Dependencies ---
vi.mock('fs-extra');
vi.mock('js-yaml');
// We can use the real crypto, pathUtils, and markdownUtils

// Mock the config module
vi.mock('../config.js', () => ({
  default: {
    paths: {
      basePath: '/test/compiler/base',
      inputDir: 'env_partials',
      outputDir: 'slurp_compiled',
    },
    compilation: {
      preserveMetadata: true,
      removeNavigation: true,
      removeDuplicates: true,
      similarityThreshold: 0.9,
    }
  },
  paths: {
    basePath: '/test/compiler/base',
    inputDir: 'env_partials',
    outputDir: 'slurp_compiled',
  },
  compilation: {
    preserveMetadata: true,
    removeNavigation: true,
    removeDuplicates: true,
    similarityThreshold: 0.9,
  }
}));

describe('MarkdownCompiler', () => {
  let defaultOptions;
  let yamlMock;
  let fsMock;

  beforeEach(async () => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock specific functions from dependencies
    yamlMock = await import('js-yaml');
    fsMock = await import('fs-extra');
// No need to set environment variables as we're now using the mocked config
    process.env.SLURP_REMOVE_DUPLICATES = 'true';

    defaultOptions = {
      // No options provided, rely on env/defaults
    };

     // Mock process.cwd() for basePath default calculation
     vi.spyOn(process, 'cwd').mockReturnValue('/test/compiler/cwd');
  });

   afterEach(() => {
     vi.restoreAllMocks(); // Restore process.cwd etc.
   });

  // --- Constructor Tests ---
  describe('constructor', () => {
    it('should initialize with defaults from config', () => {
      const compiler = new MarkdownCompiler(defaultOptions);

      expect(compiler.basePath).toBe('/test/compiler/base'); // From config
      expect(compiler.inputDir).toBe('/test/compiler/base/env_partials'); // Resolved from config
      // Default output path calculation
      const expectedDefaultOutput = path.join('/test/compiler/base', 'slurp_compiled', 'compiled_docs.md');
      expect(compiler.outputFile).toBe(expectedDefaultOutput);
      expect(compiler.preserveMetadata).toBe(true); // From config
      expect(compiler.removeNavigation).toBe(true); // From config
      expect(compiler.removeDuplicates).toBe(true); // From config
      expect(compiler.excludePatterns).toBeInstanceOf(Array);
      expect(compiler.excludePatterns.length).toBeGreaterThan(0); // Check default patterns exist
      expect(compiler.contentHashes).toBeInstanceOf(Set);
      expect(compiler.stats).toEqual({
        totalFiles: 0,
        processedFiles: 0,
        skippedFiles: 0,
        duplicatesRemoved: 0,
      });
    });

    it('should override defaults from config with provided options', () => {
      const options = {
        basePath: '/override/base',
        inputDir: 'override_input',
        outputFile: 'override/output/file.md',
        preserveMetadata: false,
        removeNavigation: false,
        removeDuplicates: false,
        excludePatterns: [/test-pattern/gi],
      };
      const compiler = new MarkdownCompiler(options);

      expect(compiler.basePath).toBe('/override/base');
      expect(compiler.inputDir).toBe('/override/base/override_input'); // Resolved
      expect(compiler.outputFile).toBe('/override/base/override/output/file.md'); // Resolved
      expect(compiler.preserveMetadata).toBe(false);
      expect(compiler.removeNavigation).toBe(false);
      expect(compiler.removeDuplicates).toBe(false);
      expect(compiler.excludePatterns).toEqual([/test-pattern/gi]);
    });

     it('should correctly determine basePath precedence: option > config > cwd', () => {
        // 1. Option provided
        let compiler = new MarkdownCompiler({ basePath: '/option/base' });
        expect(compiler.basePath).toBe('/option/base');

        // 2. Option not provided, use config value
        compiler = new MarkdownCompiler({}); // No basePath option
        expect(compiler.basePath).toBe('/test/compiler/base'); // From mocked config
     });

     it('should correctly determine inputDir precedence: option > config', () => {
        const basePath = '/test/base'; // Use a fixed base for this test
        // 1. Option provided
        let compiler = new MarkdownCompiler({ basePath, inputDir: 'option_dir' });
        expect(compiler.inputDir).toBe('/test/base/option_dir');

        // 2. Option not provided, use config value
        compiler = new MarkdownCompiler({ basePath }); // No inputDir option
        expect(compiler.inputDir).toBe('/test/base/env_partials'); // From mocked config
     });

     it('should correctly determine outputFile precedence: option > default', () => {
         const basePath = '/test/base';
         // 1. Option provided
         let compiler = new MarkdownCompiler({ basePath, outputFile: 'option/output.md' });
         expect(compiler.outputFile).toBe('/test/base/option/output.md');

         // 2. Option not provided, use default
         compiler = new MarkdownCompiler({ basePath }); // No outputFile option
         expect(compiler.outputFile).toBe('/test/base/slurp_compiled/compiled_docs.md');
     });

  });

  // --- extractFrontmatter Tests ---
  describe('extractFrontmatter', () => {
    let compiler;
    beforeEach(() => {
      compiler = new MarkdownCompiler(); // Use default options
    });

    it('should extract valid YAML frontmatter and markdown content', () => {
      const content = `---
title: Test Document
url: https://example.com
---
# Markdown Content
This is the actual content.`;
      const expectedFrontmatter = { title: 'Test Document', url: 'https://example.com' };
      const expectedMarkdown = '# Markdown Content\nThis is the actual content.';

      yamlMock.load.mockReturnValue(expectedFrontmatter);

      const result = MarkdownCompiler.extractFrontmatter(content);

      expect(yamlMock.load).toHaveBeenCalledWith('title: Test Document\nurl: https://example.com');
      expect(result.frontmatter).toEqual(expectedFrontmatter);
      expect(result.markdown).toBe(expectedMarkdown);
    });

    it('should return null frontmatter if no frontmatter block exists', () => {
      const content = `# Markdown Content Only
No frontmatter here.`;
      const result = MarkdownCompiler.extractFrontmatter(content);

      expect(yamlMock.load).not.toHaveBeenCalled();
      expect(result.frontmatter).toBeNull();
      expect(result.markdown).toBe(content);
    });

    it('should return null frontmatter and original content if YAML parsing fails', () => {
       const content = `---
invalid: yaml: here
---
# Markdown Content`;
       const error = new Error('YAML Parse Error');
       yamlMock.load.mockImplementation(() => { throw error; });
       // Mock console.error to suppress expected error message during test
       const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

       const result = MarkdownCompiler.extractFrontmatter(content);

       expect(yamlMock.load).toHaveBeenCalledWith('invalid: yaml: here');
       expect(result.frontmatter).toBeNull();
       expect(result.markdown).toBe(content); // Return original content on error
       expect(consoleErrorSpy).toHaveBeenCalledWith('Error parsing frontmatter:', error);

       consoleErrorSpy.mockRestore(); // Restore console.error
    });

     it('should handle empty frontmatter block', () => {
      const content = `---

---
# Markdown Content`;
      const expectedFrontmatter = {}; // Or null/undefined depending on yaml.load behavior for empty string
      yamlMock.load.mockReturnValue(expectedFrontmatter);

      const result = MarkdownCompiler.extractFrontmatter(content);

      expect(yamlMock.load).toHaveBeenCalledWith(''); // Called with empty string
      expect(result.frontmatter).toEqual(expectedFrontmatter);
      expect(result.markdown).toBe('# Markdown Content');
    });

     it('should handle content without closing frontmatter delimiter', () => {


  // --- hashContent Tests ---
  describe('hashContent', () => {
    let compiler;
    beforeEach(() => {
      compiler = new MarkdownCompiler();
    });

    it('should generate the same hash for identical content', () => {
      const content = '# Heading\n\nSome text.';
      const hash1 = MarkdownCompiler.hashContent(content);
      const hash2 = MarkdownCompiler.hashContent(content);
      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{32}$/); // MD5 hash format
    });

    it('should generate the same hash for content differing only in whitespace or markdown syntax', () => {
      const content1 = '# Heading\n\nSome *bold* text.';
      const content2 = '  #    Heading\n\n\n   Some **bold** text.  '; // Extra space, different bold
      const hash1 = MarkdownCompiler.hashContent(content1);
      const hash2 = MarkdownCompiler.hashContent(content2);
      expect(hash1).toBe(hash2);
    });

    it('should generate the same hash for content differing only in non-major punctuation', () => {
        const content1 = '# Heading!\n\nSome text?';
        const content2 = '# Heading\n\nSome text';
        const hash1 = MarkdownCompiler.hashContent(content1);
        const hash2 = MarkdownCompiler.hashContent(content2);
        expect(hash1).toBe(hash2);
    });


    it('should generate different hashes for different content', () => {
      const content1 = '# Heading 1\n\nText A';
      const content2 = '# Heading 2\n\nText B';
      const hash1 = MarkdownCompiler.hashContent(content1);
      const hash2 = MarkdownCompiler.hashContent(content2);
      expect(hash1).not.toBe(hash2);
    });

     it('should generate different hashes if headings differ', () => {
      const content1 = '# Heading 1\n\nText';
      const content2 = '## Heading 1\n\nText'; // Different level
      const hash1 = MarkdownCompiler.hashContent(content1);
      const hash2 = MarkdownCompiler.hashContent(content2);
      // Note: Current hashing only considers h1-h3. If h4+ differs, hash might be same.
      // Let's test h1 vs h2
      expect(hash1).not.toBe(hash2);

      const content3 = '# Heading A\n\nText';
      const content4 = '# Heading B\n\nText'; // Different text
      const hash3 = MarkdownCompiler.hashContent(content3);
      const hash4 = MarkdownCompiler.hashContent(content4);
      expect(hash3).not.toBe(hash4);
    });

    it('should generate different hashes if content sections differ significantly', () => {
        const content1 = '# H\nSection 1';
        const content2 = '# H\nSection 2';
        const hash1 = MarkdownCompiler.hashContent(content1);
        const hash2 = MarkdownCompiler.hashContent(content2);
        expect(hash1).not.toBe(hash2);
    });

    it('should handle content with no headings', () => {
        const content = 'Just plain text. No headings here.';
        const hash = MarkdownCompiler.hashContent(content);
        expect(hash).toMatch(/^[a-f0-9]{32}$/);
        const hash2 = MarkdownCompiler.hashContent('Just plain text. No headings here.');
        expect(hash).toBe(hash2);
        const hash3 = MarkdownCompiler.hashContent('Different plain text.');
        expect(hash).not.toBe(hash3);
    });
  });

  // --- cleanupContent Tests ---
  describe('cleanupContent', () => {
    it('should call sharedCleanupMarkdown', async () => {
       // Need to import the shared function to spy on it
       const markdownUtils = await import('../src/utils/markdownUtils.js');
       const cleanupSpy = vi.spyOn(markdownUtils, 'cleanupMarkdown');
       const compiler = new MarkdownCompiler();
       const content = '  Test content \n\n\n ';
       compiler.cleanupContent(content);
       expect(cleanupSpy).toHaveBeenCalledWith(content); // Initial call
       cleanupSpy.mockRestore();
    });

    it('should apply excludePatterns if removeNavigation is true', () => {
       const compiler = new MarkdownCompiler({
         removeNavigation: true,
         // Use a simple custom pattern for testing
         excludePatterns: [/REMOVE ME/gi]
       });
       const content = 'Some text\n\nREMOVE ME section\n\nMore text.';
       const expected = 'Some text\n\n\n\nMore text.'; // Pattern removed, then cleanupMarkdown applied
       const cleaned = compiler.cleanupContent(content);
       // Need to account for the shared cleanup that happens *after* pattern removal
       const finalExpected = 'Some text\n\nMore text.';
       expect(cleaned).toBe(finalExpected);
    });

     it('should NOT apply excludePatterns if removeNavigation is false', () => {
       const compiler = new MarkdownCompiler({
         removeNavigation: false,
         excludePatterns: [/REMOVE ME/gi]
       });
       const content = 'Some text\n\nREMOVE ME section\n\nMore text.';
        // sharedCleanupMarkdown still runs
       const finalExpected = 'Some text\n\nREMOVE ME section\n\nMore text.';
       const cleaned = compiler.cleanupContent(content);
       expect(cleaned).toBe(finalExpected);
    });

     it('should use default excludePatterns if none provided', () => {
        const compiler = new MarkdownCompiler({ removeNavigation: true });
        // Test a default pattern (e.g., "On this page")
        const content = 'Intro\n\nOn this page\n* Link 1\n* Link 2\n\n## Next Section';
        const cleaned = compiler.cleanupContent(content);
         // Expect "On this page..." section to be removed, then cleaned
        const finalExpected = 'Intro\n\n## Next Section';
        expect(cleaned).toBe(finalExpected);
     });
  });

   // --- processFile Tests ---
  describe('processFile', () => {
    let compiler;
    const filePath = '/test/compiler/base/env_partials/test.md';
    const fileName = 'test.md';
    const fileContent = `---\nurl: https://original.url/test\nscrapeDate: 2023-01-01T12:00:00.000Z\n---\n# Actual Content\n\nThis is the markdown body.`;
    const markdownBody = '# Actual Content\n\nThis is the markdown body.';
    const frontmatter = { url: 'https://original.url/test', scrapeDate: '2023-01-01T12:00:00.000Z' };

    beforeEach(() => {
      compiler = new MarkdownCompiler({ removeDuplicates: true, preserveMetadata: true });
      // Mock fs.readFile for this test
      fsMock.readFile.mockResolvedValue(fileContent);
      // Spy on methods within the compiler instance
      vi.spyOn(compiler, 'extractFrontmatter').mockReturnValue({ frontmatter, markdown: markdownBody });
      vi.spyOn(compiler, 'cleanupContent').mockImplementation(content => content); // Simple pass-through mock
      vi.spyOn(MarkdownCompiler, 'hashContent').mockReturnValue('unique_hash_1');
    });

    it('should read file, extract frontmatter, clean content, and format output', async () => {
      const result = await compiler.processFile(filePath);

      expect(fsMock.readFile).toHaveBeenCalledWith(filePath, 'utf8');
      expect(compiler.extractFrontmatter).toHaveBeenCalledWith(fileContent);
      expect(compiler.cleanupContent).toHaveBeenCalledWith(markdownBody);
      expect(MarkdownCompiler.hashContent).toHaveBeenCalledWith(markdownBody); // Called for duplicate check

      expect(result).toContain(`#### ${fileName}\n\n`);
      expect(result).toContain(`> Source: ${frontmatter.url}\n`);
      expect(result).toContain(`> Scraped: ${new Date(frontmatter.scrapeDate).toLocaleString()}\n`);
      expect(result).toContain(`\n\n${markdownBody}\n\n`);
    });

     it('should not include metadata if preserveMetadata is false', async () => {
        compiler = new MarkdownCompiler({ preserveMetadata: false });
        // Re-spy after creating new instance
        vi.spyOn(compiler, 'extractFrontmatter').mockReturnValue({ frontmatter, markdown: markdownBody });
        vi.spyOn(compiler, 'cleanupContent').mockImplementation(content => content);
        vi.spyOn(MarkdownCompiler, 'hashContent').mockReturnValue('unique_hash_1');

        const result = await compiler.processFile(filePath);

        expect(result).toContain(`#### ${fileName}\n\n`);
        expect(result).not.toContain(`> Source:`);
        expect(result).not.toContain(`> Scraped:`);
        expect(result).toContain(`\n\n${markdownBody}\n\n`);
     });

     it('should handle files with no frontmatter', async () => {
        const noFrontmatterContent = '# Just Content';
        fsMock.readFile.mockResolvedValue(noFrontmatterContent);
        vi.spyOn(compiler, 'extractFrontmatter').mockReturnValue({ frontmatter: null, markdown: noFrontmatterContent });
        vi.spyOn(compiler, 'cleanupContent').mockImplementation(content => content);
        vi.spyOn(MarkdownCompiler, 'hashContent').mockReturnValue('unique_hash_2');


        const result = await compiler.processFile(filePath);

        expect(compiler.extractFrontmatter).toHaveBeenCalledWith(noFrontmatterContent);
        expect(result).toContain(`#### ${fileName}\n\n`);
        expect(result).not.toContain(`> Source:`);
        expect(result).not.toContain(`> Scraped:`);
        expect(result).toContain(`\n\n${noFrontmatterContent}\n\n`);
     });

    it('should return null and skip processing if cleaned content is empty', async () => {
      vi.spyOn(compiler, 'cleanupContent').mockReturnValue('  \n  '); // Return only whitespace

      const result = await compiler.processFile(filePath);

      expect(compiler.cleanupContent).toHaveBeenCalledWith(markdownBody);
      expect(MarkdownCompiler.hashContent).not.toHaveBeenCalled(); // Should not hash empty content
      expect(result).toBeNull();
    });


  // --- processDirectoryContent Tests ---
  describe('processDirectoryContent', () => {
    let compiler;
    const inputDirPath = '/test/compiler/base/env_partials';

    beforeEach(() => {
      compiler = new MarkdownCompiler();
      // Mock processFile to return predictable content based on filename
      vi.spyOn(compiler, 'processFile').mockImplementation(async (filePath) => {
        const fileName = path.basename(filePath);
        if (fileName === 'skip.md') {
           compiler.stats.skippedFiles++; // Simulate skipping
           return null;
        }
         compiler.stats.processedFiles++; // Simulate processing
        return `#### ${fileName}\n\nProcessed content for ${fileName}\n\n`;
      });
    });

    it('should process files and subdirectories recursively', async () => {
      // Mock fs calls to simulate directory structure
      fsMock.readdir.mockImplementation(async (dir) => {
        if (dir === inputDirPath) return ['file1.md', 'subdir', 'skip.md'];
        if (dir === path.join(inputDirPath, 'subdir')) return ['file2.md'];
        return [];
      });
      fsMock.statSync.mockImplementation((itemPath) => ({
        isFile: () => itemPath.endsWith('.md'),
        isDirectory: () => !itemPath.endsWith('.md'),
      }));

      // Reset stats before run
       compiler.stats.totalFiles = 0;
       compiler.stats.processedFiles = 0;
       compiler.stats.skippedFiles = 0;

       // Refined readdir mock to update totalFiles correctly based on filtering
       fsMock.readdir.mockImplementation(async (dir) => {
         let entries = [];
         if (dir === inputDirPath) entries = ['file1.md', 'subdir', 'skip.md', 'not_a_file'];
         if (dir === path.join(inputDirPath, 'subdir')) entries = ['file2.md'];

         // Simulate the filtering logic for totalFiles count
         const markdownFiles = entries.filter(entry =>
            entry.endsWith('.md') && fsMock.statSync(path.join(dir, entry)).isFile()
         );
         compiler.stats.totalFiles += markdownFiles.length;

         return entries; // Return all entries for processing loop
       });

      const result = await compiler.processDirectoryContent(inputDirPath);

      // Check processFile calls
      expect(compiler.processFile).toHaveBeenCalledWith(path.join(inputDirPath, 'file1.md'));
      expect(compiler.processFile).toHaveBeenCalledWith(path.join(inputDirPath, 'skip.md'));
      expect(compiler.processFile).toHaveBeenCalledWith(path.join(inputDirPath, 'subdir', 'file2.md'));

      // Check generated content structure
      expect(result).toContain('#### file1.md\n\nProcessed content for file1.md\n\n');
      expect(result).toContain('## subdir\n\n'); // Heading for subdir
      expect(result).toContain('#### file2.md\n\nProcessed content for file2.md\n\n');
      expect(result).not.toContain('skip.md'); // Skipped file content shouldn't be there

      // Check stats
       expect(compiler.stats.totalFiles).toBe(3); // file1, skip, file2 are .md and files
       expect(compiler.stats.processedFiles).toBe(2); // file1, file2 processed
       expect(compiler.stats.skippedFiles).toBe(1); // skip.md skipped

    });

    it('should handle empty directories', async () => {
      fsMock.readdir.mockResolvedValue([]);
      const result = await compiler.processDirectoryContent(inputDirPath);
      expect(result).toBe('');
      expect(compiler.processFile).not.toHaveBeenCalled();
       expect(compiler.stats.totalFiles).toBe(0);
    });

     it('should generate correct heading levels for nested directories', async () => {
        // Reset stats
       compiler.stats.totalFiles = 0;
       compiler.stats.processedFiles = 0;
       compiler.stats.skippedFiles = 0;

       fsMock.readdir.mockImplementation(async (dir) => {
            let entries = [];
            if (dir === inputDirPath) entries = ['level2dir'];
            if (dir === path.join(inputDirPath, 'level2dir')) entries = ['level3dir'];
            if (dir === path.join(inputDirPath, 'level2dir', 'level3dir')) entries = ['file.md'];

            const markdownFiles = entries.filter(entry =>
                entry.endsWith('.md') && fsMock.statSync(path.join(dir, entry)).isFile()
            );
            compiler.stats.totalFiles += markdownFiles.length;
            return entries;
       });
       fsMock.statSync.mockImplementation((itemPath) => ({
         isFile: () => itemPath.endsWith('.md'),
         isDirectory: () => !itemPath.endsWith('.md'),
       }));

       const result = await compiler.processDirectoryContent(inputDirPath);

       expect(result).toContain('## level2dir\n\n');
       expect(result).toContain('### level3dir\n\n');
       expect(result).toContain('#### file.md\n\nProcessed content for file.md\n\n');
       expect(compiler.stats.totalFiles).toBe(1);
       expect(compiler.stats.processedFiles).toBe(1);
     });
  });

  // --- compile Tests ---
  describe('compile', () => {
     let compiler;
     const outputFilePath = '/test/compiler/base/slurp_compiled/compiled_docs.md';
     const inputDirPath = '/test/compiler/base/env_partials';
     const processedContent = '## subdir\n\n#### file.md\n\nProcessed content\n\n';

     beforeEach(() => {
        compiler = new MarkdownCompiler(); // Uses env vars for paths
        // Mock pathExists, ensureDir, writeFile
        fsMock.pathExists.mockResolvedValue(true); // Assume input dir exists by default
        fsMock.ensureDir.mockResolvedValue(undefined);
        fsMock.writeFile.mockResolvedValue(undefined);
        // Mock processDirectoryContent
        vi.spyOn(compiler, 'processDirectoryContent').mockResolvedValue(processedContent);
        // Mock stats from processDirectoryContent run
        compiler.stats = { totalFiles: 1, processedFiles: 1, skippedFiles: 0, duplicatesRemoved: 0 };
     });

     it('should compile successfully and write output file', async () => {
        const result = await compiler.compile();

        expect(fsMock.pathExists).toHaveBeenCalledWith(inputDirPath);
        expect(compiler.processDirectoryContent).toHaveBeenCalledWith(inputDirPath);
        expect(fsMock.ensureDir).toHaveBeenCalledWith(path.dirname(outputFilePath));
        expect(fsMock.writeFile).toHaveBeenCalledOnce();

        // Check content written
        const writtenContent = fsMock.writeFile.mock.calls[0][1];
        expect(writtenContent).toMatch(/^# Compiled Documentation\n\nGenerated on .*?\n\n/); // Check header
        expect(writtenContent).toContain(processedContent); // Check processed content included

        // Check returned result
        expect(result).toEqual({
            outputFile: outputFilePath, // Should be absolute path
            stats: compiler.stats // Should return the final stats
        });
     });

     it('should throw an error if input directory does not exist', async () => {
        fsMock.pathExists.mockResolvedValue(false); // Simulate input dir not found
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});


        await expect(compiler.compile()).rejects.toThrow(`Input directory not found: ${inputDirPath}`);

        expect(fsMock.pathExists).toHaveBeenCalledWith(inputDirPath);
        expect(compiler.processDirectoryContent).not.toHaveBeenCalled();
        expect(fsMock.writeFile).not.toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalled(); // Error should be logged
        consoleErrorSpy.mockRestore();
     });

      it('should handle errors during directory processing', async () => {
         const processError = new Error('Failed to process directory');
         vi.spyOn(compiler, 'processDirectoryContent').mockRejectedValue(processError);
         const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

         await expect(compiler.compile()).rejects.toThrow(processError);

         expect(fsMock.writeFile).not.toHaveBeenCalled();
         expect(consoleErrorSpy).toHaveBeenCalledWith('Compilation error:', processError);
         consoleErrorSpy.mockRestore();
      });

      it('should handle errors during file writing', async () => {
          const writeError = new Error('Failed to write file');
          fsMock.writeFile.mockRejectedValue(writeError);
          const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

          await expect(compiler.compile()).rejects.toThrow(writeError);
          expect(consoleErrorSpy).toHaveBeenCalledWith('Compilation error:', writeError);
          consoleErrorSpy.mockRestore();
      });
  });


    it('should return null and increment duplicate count if content hash exists (and removeDuplicates is true)', async () => {
      compiler.contentHashes.add('existing_hash');
      vi.spyOn(MarkdownCompiler, 'hashContent').mockReturnValue('existing_hash');

      const initialDuplicates = compiler.stats.duplicatesRemoved;
      const result = await compiler.processFile(filePath);

      expect(MarkdownCompiler.hashContent).toHaveBeenCalledWith(markdownBody);
      expect(result).toBeNull();
      expect(compiler.stats.duplicatesRemoved).toBe(initialDuplicates + 1);
    });

    it('should process file and add hash if content hash does not exist (and removeDuplicates is true)', async () => {
       vi.spyOn(MarkdownCompiler, 'hashContent').mockReturnValue('new_unique_hash');
       const initialDuplicates = compiler.stats.duplicatesRemoved;

       expect(compiler.contentHashes.has('new_unique_hash')).toBe(false);
       const result = await compiler.processFile(filePath);

       expect(MarkdownCompiler.hashContent).toHaveBeenCalledWith(markdownBody);
       expect(result).not.toBeNull();
       expect(compiler.contentHashes.has('new_unique_hash')).toBe(true);
       expect(compiler.stats.duplicatesRemoved).toBe(initialDuplicates); // Not incremented
    });

    it('should process file and NOT add hash if removeDuplicates is false', async () => {
        compiler = new MarkdownCompiler({ removeDuplicates: false });
        // Re-spy
        vi.spyOn(compiler, 'extractFrontmatter').mockReturnValue({ frontmatter, markdown: markdownBody });
        vi.spyOn(compiler, 'cleanupContent').mockImplementation(content => content);
        vi.spyOn(MarkdownCompiler, 'hashContent').mockReturnValue('some_hash'); // Mock hash call

        const initialHashCount = compiler.contentHashes.size;
        const result = await compiler.processFile(filePath);

        expect(MarkdownCompiler.hashContent).not.toHaveBeenCalled(); // Duplicate check skipped
        expect(result).not.toBeNull();
        expect(compiler.contentHashes.size).toBe(initialHashCount); // No hash added
    });

     it('should return null and log error if fs.readFile fails', async () => {
        const error = new Error('Read file failed');
        fsMock.readFile.mockRejectedValue(error);
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const result = await compiler.processFile(filePath);

        expect(result).toBeNull();
        expect(consoleErrorSpy).toHaveBeenCalledWith(`Error processing file ${filePath}:`, error);
        consoleErrorSpy.mockRestore();
     });
  });
       const content = `---
title: Test
# Markdown Content`; // Missing closing ---
       const result = MarkdownCompiler.extractFrontmatter(content);

       expect(yamlMock.load).not.toHaveBeenCalled();
       expect(result.frontmatter).toBeNull();
       expect(result.markdown).toBe(content);
     });
  });

  // --- More tests (hashContent, cleanupContent, processFile, processDirectoryContent, compile) ---

});