// __tests__/DocumentationScraper.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import DocumentationScraper from '../src/DocumentationScraper.js';
import { URL } from 'url'; // Use Node's built-in URL

// --- Mock Dependencies ---
// Mock external libraries
vi.mock('axios');
vi.mock('puppeteer');
vi.mock('turndown');
vi.mock('fs-extra');
vi.mock('p-queue', async (importOriginal) => {
  const actualPQueue = await importOriginal();
  // Mock the default export which is the PQueue class
  return {
    default: vi.fn().mockImplementation(() => ({
      add: vi.fn((fn) => Promise.resolve(fn())), // Simple auto-execution for tests
      onIdle: vi.fn().mockResolvedValue(undefined),
      stop: vi.fn(),
      clear: vi.fn(),
      size: 0,
      pending: 0,
    })),
    // Preserve other exports if needed (though default is primary)
    ...actualPQueue
  };
});
vi.mock('@extractus/article-extractor');

// Mock internal utilities (selectively)
vi.mock('../src/utils/logger.js', () => ({
  log: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    verbose: vi.fn(),
    success: vi.fn(),
  },
}));
// We will use the actual pathUtils and markdownUtils as they are already tested

// --- Test Suite ---
describe('DocumentationScraper', () => {
  let defaultOptions;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Restore default env vars or set mocks
    process.env.SLURP_BASE_PATH = '/test/base';
    process.env.SLURP_PARTIALS_DIR = 'test_partials';
    process.env.SLURP_MAX_PAGES_PER_SITE = '50';
    process.env.SLURP_USE_HEADLESS = 'true';
    process.env.SLURP_ENFORCE_BASE_PATH = 'true';
    process.env.SLURP_CONCURRENCY = '8';
    process.env.SLURP_RETRY_COUNT = '2';
    process.env.SLURP_RETRY_DELAY = '500';
    process.env.SLURP_PRESERVE_QUERY_PARAMS = 'version,lang';
    process.env.SLURP_DEPTH_NUMBER_OF_SEGMENTS = '5';
    process.env.SLURP_DEPTH_SEGMENT_CHECK = JSON.stringify(['/docs/', '/api/']); // Store as JSON string


    defaultOptions = {
      baseUrl: 'https://example.com/docs/v1/',
      // outputDir will use SLURP_PARTIALS_DIR env var by default now
    };
  });

  afterEach(() => {
     // Clean up env vars if necessary
     delete process.env.SLURP_BASE_PATH;
     delete process.env.SLURP_PARTIALS_DIR;
     delete process.env.SLURP_MAX_PAGES_PER_SITE;
     delete process.env.SLURP_USE_HEADLESS;
     delete process.env.SLURP_ENFORCE_BASE_PATH;
     delete process.env.SLURP_CONCURRENCY;
     delete process.env.SLURP_RETRY_COUNT;
     delete process.env.SLURP_RETRY_DELAY;
     delete process.env.SLURP_PRESERVE_QUERY_PARAMS;
     delete process.env.SLURP_DEPTH_NUMBER_OF_SEGMENTS;
     delete process.env.SLURP_DEPTH_SEGMENT_CHECK;
  });

  // --- Constructor Tests ---
  describe('constructor', () => {
    it('should initialize with default options and environment variables', () => {
      const scraper = new DocumentationScraper(defaultOptions);

      expect(scraper.baseUrl).toBe(defaultOptions.baseUrl);
      expect(scraper.basePath).toBe('/test/base'); // From env
      expect(scraper.outputDir).toBe('/test/base/test_partials'); // Resolved from env
      expect(scraper.libraryInfo).toEqual({});
      expect(scraper.visitedUrls).toBeInstanceOf(Set);
      expect(scraper.queuedUrls).toBeInstanceOf(Set);
      expect(scraper.inProgressUrls).toBeInstanceOf(Set);
      expect(scraper.baseUrlObj).toBeInstanceOf(URL);
      expect(scraper.baseUrlObj.href).toBe(defaultOptions.baseUrl);
      expect(scraper.allowedDomains).toEqual(['example.com']);
      expect(scraper.maxPages).toBe(50); // From env
      expect(scraper.useHeadless).toBe(true); // From env
      expect(scraper.baseUrlPath).toBe('/docs/v1/');
      expect(scraper.enforceBasePath).toBe(true); // From env
      expect(scraper.urlBlacklist).toBeInstanceOf(Array); // Check default exists
      expect(scraper.queryParamsToKeep).toEqual(['version', 'lang']); // From env
      expect(scraper.concurrency).toBe(8); // From env
      expect(scraper.retryCount).toBe(2); // From env
      expect(scraper.retryDelay).toBe(500); // From env
      expect(scraper.queue).toBeDefined();
      expect(scraper.turndownService).toBeDefined();
      expect(scraper.stats).toEqual({ processed: 0, failed: 0, startTime: null, endTime: null });
      expect(scraper.signal).toBeUndefined();
    });

    it('should override defaults and environment variables with provided options', () => {
      const options = {
        ...defaultOptions,
        basePath: '/override/base',
        outputDir: 'override_partials',
        allowedDomains: ['example.com', 'docs.example.com'],
        maxPages: 100,
        useHeadless: false,
        enforceBasePath: false,
        concurrency: 15,
        retryCount: 5,
        retryDelay: 2000,
        queryParamsToKeep: ['id', 'token'],
        excludeSelectors: ['nav', 'footer'],
        libraryInfo: { name: 'TestLib', version: '1.0' },
        signal: new AbortController().signal,
      };
      const scraper = new DocumentationScraper(options);

      expect(scraper.basePath).toBe('/override/base');
      expect(scraper.outputDir).toBe('/override/base/override_partials'); // Resolved
      expect(scraper.allowedDomains).toEqual(['example.com', 'docs.example.com']);
      expect(scraper.maxPages).toBe(100);
      expect(scraper.useHeadless).toBe(false);
      expect(scraper.enforceBasePath).toBe(false);
      expect(scraper.concurrency).toBe(15);
      expect(scraper.retryCount).toBe(5);
      expect(scraper.retryDelay).toBe(2000);
      expect(scraper.queryParamsToKeep).toEqual(['id', 'token']);
      expect(scraper.excludeSelectors).toContain('nav');
      expect(scraper.excludeSelectors).toContain('footer');
      expect(scraper.libraryInfo).toEqual({ name: 'TestLib', version: '1.0' });
      expect(scraper.signal).toBeDefined();
    });

     it('should correctly determine outputDir precedence: option > env > default', () => {
        // 1. Option provided
        let scraper = new DocumentationScraper({ ...defaultOptions, outputDir: 'option_dir' });
        expect(scraper.outputDir).toBe('/test/base/option_dir');

        // 2. Option not provided, env provided
        delete process.env.SLURP_PARTIALS_DIR; // Remove specific env var for this sub-test
        process.env.SLURP_PARTIALS_DIR = 'env_dir';
        scraper = new DocumentationScraper({ ...defaultOptions }); // No outputDir option
        expect(scraper.outputDir).toBe('/test/base/env_dir');
        delete process.env.SLURP_PARTIALS_DIR; // Clean up

        // 3. Option and env not provided, use default 'slurp_partials'
        scraper = new DocumentationScraper({ ...defaultOptions }); // No outputDir option, env deleted
        expect(scraper.outputDir).toBe('/test/base/slurp_partials'); // Default relative to basePath
     });

     it('should correctly determine basePath precedence: option > env > cwd', () => {
        const originalCwd = process.cwd;
        process.cwd = vi.fn(() => '/mock/cwd'); // Mock cwd

        // 1. Option provided
        let scraper = new DocumentationScraper({ ...defaultOptions, basePath: '/option/base' });
        expect(scraper.basePath).toBe('/option/base');

        // 2. Option not provided, env provided
        delete process.env.SLURP_BASE_PATH; // Remove specific env var for this sub-test
        process.env.SLURP_BASE_PATH = '/env/base';
        scraper = new DocumentationScraper({ ...defaultOptions }); // No basePath option
        expect(scraper.basePath).toBe('/env/base');
        delete process.env.SLURP_BASE_PATH; // Clean up

        // 3. Option and env not provided, use default process.cwd()
        scraper = new DocumentationScraper({ ...defaultOptions }); // No basePath option, env deleted
        expect(scraper.basePath).toBe('/mock/cwd'); // Default

        process.cwd = originalCwd; // Restore original cwd
     });


    it('should add provided excludeSelectors to the default list', () => {
        const scraper = new DocumentationScraper({
            ...defaultOptions,
            excludeSelectors: ['.sidebar', 'header > nav']
        });
        expect(scraper.excludeSelectors).toEqual(expect.arrayContaining([
            'script', 'style', 'noscript', 'iframe', 'object', 'embed', // Defaults
            '.sidebar', 'header > nav' // Added
        ]));
    });
  });

  // --- getFilenameForUrl Tests ---
  describe('getFilenameForUrl', () => {
     let scraper;
     beforeEach(() => {
       scraper = new DocumentationScraper(defaultOptions);
     });

    it('should generate index.md for the root path', () => {
      expect(scraper.getFilenameForUrl('https://example.com/')).toBe('index.md');
      expect(scraper.getFilenameForUrl('https://example.com')).toBe('index.md'); // No trailing slash
    });

    it('should replace slashes with underscores', () => {
      expect(scraper.getFilenameForUrl('https://example.com/path/to/page')).toBe('_path_to_page.md');
    });

    it('should handle paths ending with a slash', () => {
      expect(scraper.getFilenameForUrl('https://example.com/path/to/page/')).toBe('_path_to_page_.md'); // Underscore added for trailing slash
    });

    it('should add .md extension if not present', () => {
      expect(scraper.getFilenameForUrl('https://example.com/path/file')).toBe('_path_file.md');
    });

    it('should keep .md extension if already present (though URL paths usually dont have it)', () => {
       // This case is less common for URLs but tests the logic
      expect(scraper.getFilenameForUrl('https://example.com/path/file.md')).toBe('_path_file.md');
    });

    it('should handle complex paths', () => {
      expect(scraper.getFilenameForUrl('https://example.com/a/b-c/d_e/f/')).toBe('_a_b-c_d_e_f_.md');
    });

     it('should ignore query parameters and hash', () => {
      expect(scraper.getFilenameForUrl('https://example.com/path/page?query=1#section')).toBe('_path_page.md');
    });
  });

  // --- State Calculation Tests ---
   describe('State Calculation (getTotalPageCount, hasReachedMaxPages)', () => {
    let scraper;
    beforeEach(() => {
      scraper = new DocumentationScraper({ ...defaultOptions, maxPages: 3 });
    });

    it('getTotalPageCount should sum sizes of visited, inProgress, and queued sets', () => {
      scraper.visitedUrls.add('url1');
      scraper.inProgressUrls.add('url2');
      scraper.queuedUrls.add('url3');
      scraper.queuedUrls.add('url4');
      expect(scraper.getTotalPageCount()).toBe(4);
    });

    it('hasReachedMaxPages should return false if total < maxPages', () => {
      scraper.visitedUrls.add('url1');
      scraper.inProgressUrls.add('url2');
      expect(scraper.hasReachedMaxPages()).toBe(false);
    });

    it('hasReachedMaxPages should return true if total === maxPages', () => {
      scraper.visitedUrls.add('url1');
      scraper.inProgressUrls.add('url2');
      scraper.queuedUrls.add('url3');
      expect(scraper.hasReachedMaxPages()).toBe(true);
    });

    it('hasReachedMaxPages should return true if total > maxPages', () => {
      scraper.visitedUrls.add('url1');
      scraper.inProgressUrls.add('url2');
      scraper.queuedUrls.add('url3');
      scraper.queuedUrls.add('url4');
      expect(scraper.hasReachedMaxPages()).toBe(true);
    });

    it('hasReachedMaxPages should return false if maxPages is 0 (unlimited)', () => {
      scraper = new DocumentationScraper({ ...defaultOptions, maxPages: 0 });
      scraper.visitedUrls.add('url1');
      scraper.inProgressUrls.add('url2');
      scraper.queuedUrls.add('url3');
      expect(scraper.hasReachedMaxPages()).toBe(false);
    });
  });


  // --- preprocessUrl Tests ---
  describe('preprocessUrl', () => {
    let scraper;
    const sourceUrl = 'https://example.com/docs/v1/source.html';

    beforeEach(() => {
      // Base URL: https://example.com/docs/v1/
      // Allowed Domain: example.com
      // Enforce Base Path: true (/docs/v1/)
      // Query Params to Keep: version, lang (from env mock)
      // Depth Segments: 5
      // Depth Patterns: /docs/, /api/
      scraper = new DocumentationScraper({
         baseUrl: 'https://example.com/docs/v1/',
         allowedDomains: ['example.com'], // Explicitly set for clarity
         enforceBasePath: true, // Explicitly set for clarity
         // queryParamsToKeep uses env mock ['version', 'lang']
         // Depth settings use env mocks
      });
       // Mock the environment variables used inside preprocessUrl
       process.env.SLURP_DEPTH_NUMBER_OF_SEGMENTS = '5';
       process.env.SLURP_DEPTH_SEGMENT_CHECK = JSON.stringify(['/docs/', '/api/']);
    });

     afterEach(() => {
        // Clean up env vars specific to this describe block if needed
        delete process.env.SLURP_DEPTH_NUMBER_OF_SEGMENTS;
        delete process.env.SLURP_DEPTH_SEGMENT_CHECK;
     });


    it('should return null for disallowed domains', () => {
      expect(scraper.preprocessUrl('https://otherdomain.com/page', sourceUrl)).toBeNull();
    });

    it('should return null if enforceBasePath is true and path is outside base path', () => {
      expect(scraper.preprocessUrl('https://example.com/other/page', sourceUrl)).toBeNull();
      expect(scraper.preprocessUrl('https://example.com/docs/v2/page', sourceUrl)).toBeNull(); // Different version path
    });

    it('should return URL if enforceBasePath is true and path is inside base path', () => {
      const url = 'https://example.com/docs/v1/sub/page.html';
      expect(scraper.preprocessUrl(url, sourceUrl)).toBe(url); // Expect normalized URL
    });

     it('should return URL if enforceBasePath is false, even if outside base path', () => {
      scraper = new DocumentationScraper({ ...defaultOptions, enforceBasePath: false });
      const url = 'https://example.com/other/page';
      expect(scraper.preprocessUrl(url, sourceUrl)).toBe(url);
    });

    it('should return null for blacklisted URL patterns', () => {
      expect(scraper.preprocessUrl('https://example.com/docs/v1/blog/post', sourceUrl)).toBeNull();
      expect(scraper.preprocessUrl('https://example.com/docs/v1/login/', sourceUrl)).toBeNull();
      expect(scraper.preprocessUrl('https://example.com/docs/v1/about-us', sourceUrl)).toBeNull(); // Contains 'about'
    });

    it('should return null for disallowed file extensions', () => {
      expect(scraper.preprocessUrl('https://example.com/docs/v1/image.jpg', sourceUrl)).toBeNull();
      expect(scraper.preprocessUrl('https://example.com/docs/v1/archive.zip', sourceUrl)).toBeNull();
      expect(scraper.preprocessUrl('https://example.com/docs/v1/document.pdf', sourceUrl)).toBeNull();
    });

    it('should remove disallowed query parameters and keep allowed ones', () => {
      const url = 'https://example.com/docs/v1/page?version=1&lang=en&tracking=123&session=abc';
      const expected = 'https://example.com/docs/v1/page?version=1&lang=en';
      expect(scraper.preprocessUrl(url, sourceUrl)).toBe(expected);
    });

     it('should handle URLs with only disallowed query parameters', () => {
      const url = 'https://example.com/docs/v1/page?tracking=123&session=abc';
      const expected = 'https://example.com/docs/v1/page';
      expect(scraper.preprocessUrl(url, sourceUrl)).toBe(expected);
    });

    it('should remove the hash fragment', () => {
      const url = 'https://example.com/docs/v1/page?version=1#section-two';
      const expected = 'https://example.com/docs/v1/page?version=1';
      expect(scraper.preprocessUrl(url, sourceUrl)).toBe(expected);
    });

    it('should remove trailing slash from pathname (unless root)', () => {
      expect(scraper.preprocessUrl('https://example.com/docs/v1/page/', sourceUrl)).toBe('https://example.com/docs/v1/page');
      expect(scraper.preprocessUrl('https://example.com/', sourceUrl)).toBe('https://example.com/'); // Root should keep slash
    });

    it('should return null for pagination/sorting params if no kept params exist and page > 1', () => {
        expect(scraper.preprocessUrl('https://example.com/docs/v1/list?page=2', sourceUrl)).toBeNull();
        expect(scraper.preprocessUrl('https://example.com/docs/v1/list?sort=asc', sourceUrl)).toBe('https://example.com/docs/v1/list'); // Sort allowed if page=1 implicitly
        expect(scraper.preprocessUrl('https://example.com/docs/v1/list?page=1&sort=desc', sourceUrl)).toBe('https://example.com/docs/v1/list'); // Page 1 allowed
    });

    it('should keep pagination/sorting params if kept params also exist', () => {
        const url = 'https://example.com/docs/v1/list?page=3&lang=fr';
        const expected = 'https://example.com/docs/v1/list?lang=fr'; // Page param removed, lang kept
        expect(scraper.preprocessUrl(url, sourceUrl)).toBe(expected);
    });

    it('should return null for URLs exceeding depth if not matching doc patterns', () => {
        // SLURP_DEPTH_NUMBER_OF_SEGMENTS = 5
        // SLURP_DEPTH_SEGMENT_CHECK = ['/docs/', '/api/']
        const deepUrl = 'https://example.com/a/b/c/d/e/f/g'; // 7 segments
        expect(scraper.preprocessUrl(deepUrl, sourceUrl)).toBeNull();
    });

     it('should allow URLs exceeding depth if matching doc patterns', () => {
        const deepDocUrl = 'https://example.com/docs/a/b/c/d/e/f/g'; // 8 segments, but matches /docs/
        expect(scraper.preprocessUrl(deepDocUrl, sourceUrl)).toBe(deepDocUrl);
         const deepApiUrl = 'https://example.com/api/v1/a/b/c/d/e/f'; // 8 segments, but matches /api/
        expect(scraper.preprocessUrl(deepApiUrl, sourceUrl)).toBe(deepApiUrl);
    });

     it('should handle relative URLs correctly during preprocessing', () => {
        // Source: https://example.com/docs/v1/source.html
        const relativeUrl = 'sub/page.html?lang=de&other=true';
        const expected = 'https://example.com/docs/v1/sub/page.html?lang=de';
        expect(scraper.preprocessUrl(relativeUrl, sourceUrl)).toBe(expected);

        const relativeSibling = '../sibling/page?version=2';
        const expectedSibling = 'https://example.com/docs/sibling/page?version=2';
         // Need to adjust scraper base URL/path for this test case to be valid if enforceBasePath=true
         scraper = new DocumentationScraper({ ...defaultOptions, enforceBasePath: false });
        expect(scraper.preprocessUrl(relativeSibling, sourceUrl)).toBe(expectedSibling);
     });

     it('should return null for invalid URLs', () => {
         expect(scraper.preprocessUrl('not-a-valid-url', sourceUrl)).toBeNull();
         expect(scraper.preprocessUrl('javascript:void(0)', sourceUrl)).toBeNull(); // Although extractLinks should filter this first
     });
  });



  // --- extractLinks Tests ---
  describe('extractLinks', () => {
    let scraper;
    const currentUrl = 'https://example.com/docs/v1/current.html';
    // Mock Cheerio instance ($)
    let mockCheerioInstance;

    beforeEach(async () => {
      scraper = new DocumentationScraper({
         baseUrl: 'https://example.com/docs/v1/',
         allowedDomains: ['example.com'],
         enforceBasePath: true,
      });
      // Mock the cheerio object returned by load
      // We'll configure the 'each' method per test
      mockCheerioInstance = {
         find: vi.fn().mockReturnThis(), // Chainable
         each: vi.fn(),
         attr: vi.fn(), // Mock attr separately if needed by filter/replacement
      };
      // Mock the main cheerio load function if needed, or just pass the instance
      // For simplicity, we'll simulate the behavior within the test
       const cheerio = await import('cheerio'); // Need to import to mock
       // Use vi.spyOn if cheerio is already loaded/cached, otherwise mock directly
       vi.spyOn(cheerio, 'load').mockReturnValue(mockCheerioInstance);
       // Handle potential default export issues if necessary
       if (cheerio.default) {
          vi.spyOn(cheerio.default, 'load').mockReturnValue(mockCheerioInstance);
       }

    });

    // Helper to simulate cheerio's each
    const simulateLinks = (links) => {
      mockCheerioInstance.each.mockImplementation((callback) => {
        links.forEach((link, index) => {
          // Simulate the 'el' argument for attr
          const mockElement = { attr: (attrName) => link[attrName] };
          callback(index, mockElement);
        });
      });
       // Simulate the $('a[href]') part returning the mock instance
       // This part is tricky as $ is usually the return of load()
       // We'll assume the test passes the correctly mocked $ instance
       const mockDollar = (selector) => {
           if (selector === 'a[href]') {
               return { // Return an object that has the 'each' method configured above
                   each: mockCheerioInstance.each
               };
           }
           return { each: vi.fn() }; // Default empty mock for other selectors
       };
       return mockDollar; // Return the function that simulates $
    };


    it('should extract and normalize valid links within the allowed domain and base path', () => {
      const mock$ = simulateLinks([
        { href: '/docs/v1/page1' }, // Relative within base path
        { href: 'page2.html' },      // Relative sibling
        { href: 'https://example.com/docs/v1/page3?version=1' }, // Absolute, keep allowed query param
      ]);
      const newUrls = scraper.extractLinks(mock$, currentUrl);
      expect(newUrls).toEqual([
        'https://example.com/docs/v1/page1',
        'https://example.com/docs/v1/page2.html',
        'https://example.com/docs/v1/page3?version=1',
      ]);
    });

    it('should ignore links outside the allowed domain', () => {
       const mock$ = simulateLinks([{ href: 'https://other.com/page' }]);
       const newUrls = scraper.extractLinks(mock$, currentUrl);
       expect(newUrls).toEqual([]);
    });

     it('should ignore links outside the base path if enforceBasePath is true', () => {
       const mock$ = simulateLinks([{ href: '/docs/v2/page' }, { href: '/other/path' }]);
       const newUrls = scraper.extractLinks(mock$, currentUrl);
       expect(newUrls).toEqual([]);
     });

     it('should include links outside the base path if enforceBasePath is false', () => {
       scraper = new DocumentationScraper({ ...defaultOptions, enforceBasePath: false });
       const mock$ = simulateLinks([{ href: '/other/path' }]);
       const newUrls = scraper.extractLinks(mock$, currentUrl);
       expect(newUrls).toEqual(['https://example.com/other/path']);
     });

    it('should ignore fragment links (#)', () => {
      const mock$ = simulateLinks([{ href: '#section1' }]);
      const newUrls = scraper.extractLinks(mock$, currentUrl);
      expect(newUrls).toEqual([]);
    });

    it('should ignore javascript links', () => {
      const mock$ = simulateLinks([{ href: 'javascript:void(0);' }]);
      const newUrls = scraper.extractLinks(mock$, currentUrl);
      expect(newUrls).toEqual([]);
    });

    it('should ignore links matching blacklist patterns', () => {
       const mock$ = simulateLinks([{ href: '/docs/v1/login' }]);
       const newUrls = scraper.extractLinks(mock$, currentUrl);
       expect(newUrls).toEqual([]);
    });

     it('should ignore links with disallowed file extensions', () => {
       const mock$ = simulateLinks([{ href: '/docs/v1/image.png' }]);
       const newUrls = scraper.extractLinks(mock$, currentUrl);
       expect(newUrls).toEqual([]);
     });

    it('should ignore already visited, queued, or in-progress URLs', () => {
      scraper.visitedUrls.add('https://example.com/docs/v1/page1');
      scraper.queuedUrls.add('https://example.com/docs/v1/page2');
      scraper.inProgressUrls.add('https://example.com/docs/v1/page3');
      const mock$ = simulateLinks([
        { href: '/docs/v1/page1' }, // Visited
        { href: '/docs/v1/page2' }, // Queued
        { href: '/docs/v1/page3' }, // In Progress
        { href: '/docs/v1/page4' }, // New
      ]);
      const newUrls = scraper.extractLinks(mock$, currentUrl);
      expect(newUrls).toEqual(['https://example.com/docs/v1/page4']);
    });

    it('should handle invalid URLs gracefully', async () => {
        const logger = await import('../src/utils/logger.js'); // Get mock logger
        const mock$ = simulateLinks([{ href: 'invalid-url::' }]); // Invalid URL format
        const newUrls = scraper.extractLinks(mock$, currentUrl);
        expect(newUrls).toEqual([]);
        expect(logger.log.warn).toHaveBeenCalledWith(expect.stringContaining('Skipping invalid link'));
    });
  });

  // --- saveMarkdown Tests ---
  describe('saveMarkdown', () => {
    let scraper;
    let fsMock;
    const testUrl = 'https://example.com/docs/v1/test-page';
    const markdownContent = '# Test Content\n\nThis is a test.';
    const expectedFilename = '_docs_v1_test-page.md'; // Based on getFilenameForUrl
    const baseOutputDir = '/test/base/test_partials'; // From defaultOptions + env

    beforeEach(async () => {
      scraper = new DocumentationScraper(defaultOptions);
      fsMock = await import('fs-extra'); // Get the mocked fs-extra
      scraper.emit = vi.fn(); // Mock the emit method
    });

    it('should save markdown with correct frontmatter to the base output directory', async () => {
      await scraper.saveMarkdown(testUrl, markdownContent);

      const expectedPath = `${baseOutputDir}/${expectedFilename}`;
      expect(fsMock.ensureDir).toHaveBeenCalledWith(baseOutputDir);
      expect(fsMock.writeFile).toHaveBeenCalledOnce();
      expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.stringContaining(`url: ${testUrl}`)
      );
      expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.stringContaining(`scrapeDate: `) // Check date exists
      );
       expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.not.stringContaining(`library:`)
      );
      expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.not.stringContaining(`version:`)
      );
       expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.not.stringContaining(`exactVersionMatch:`)
      );
      expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.stringContaining(`---\n\n${markdownContent}`)
      );
    });

    it('should create library and version subdirectories if provided', async () => {
      const options = { library: 'testlib', version: '2.5.0', exactVersionMatch: true };
      await scraper.saveMarkdown(testUrl, markdownContent, options);

      const expectedDir = `${baseOutputDir}/testlib/2.5.0`;
      const expectedPath = `${expectedDir}/${expectedFilename}`;

      expect(fsMock.ensureDir).toHaveBeenCalledWith(expectedDir);
      expect(fsMock.writeFile).toHaveBeenCalledOnce();
      expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.stringContaining(`library: ${options.library}`)
      );
      expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.stringContaining(`version: ${options.version}`)
      );
       expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.stringContaining(`exactVersionMatch: ${options.exactVersionMatch}`)
      );
       expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.stringContaining(`---\n\n${markdownContent}`)
      );
    });

     it('should create only library subdirectory if only library is provided', async () => {
      const options = { library: 'anotherlib' };
      await scraper.saveMarkdown(testUrl, markdownContent, options);

      const expectedDir = `${baseOutputDir}/anotherlib`;
      const expectedPath = `${expectedDir}/${expectedFilename}`;

      expect(fsMock.ensureDir).toHaveBeenCalledWith(expectedDir);
      expect(fsMock.writeFile).toHaveBeenCalledOnce();
      expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.stringContaining(`library: ${options.library}`)
      );
      expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.not.stringContaining(`version:`)
      );
       expect(fsMock.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.stringContaining(`---\n\n${markdownContent}`)
      );
    });

    it('should emit a "progress" event after saving', async () => {
      scraper.visitedUrls.add('url1'); // Add some visited URLs for progress calculation
      scraper.visitedUrls.add('url2');
      scraper.maxPages = 10; // Set maxPages for progress calculation

      await scraper.saveMarkdown(testUrl, markdownContent);

      const expectedPath = `${baseOutputDir}/${expectedFilename}`;
      expect(scraper.emit).toHaveBeenCalledWith('progress', {
        type: 'saved',
        url: testUrl,
        outputPath: expectedPath,
        processed: 2, // Size of visitedUrls
        total: 10, // scraper.maxPages
        progress: 20, // floor((2 / 10) * 100)
      });
    });

     it('should calculate progress based on total pages if maxPages is 0', async () => {
      scraper.maxPages = 0; // Unlimited
      scraper.visitedUrls.add('url1');
      scraper.queuedUrls.add('q1');
      scraper.inProgressUrls.add('p1');
      // Total pages = 1 (visited) + 1 (queued) + 1 (inProgress) = 3

      await scraper.saveMarkdown(testUrl, markdownContent);

      const expectedPath = `${baseOutputDir}/${expectedFilename}`;
       // Note: visitedUrls size increases *after* saveMarkdown in the real flow,
       // but for this isolated test, we assume it's called when visited size is 1.
       // If saveMarkdown was called *after* adding testUrl to visited, processed would be 2.
       // Let's test the state *before* adding the current URL.
      expect(scraper.emit).toHaveBeenCalledWith('progress', {
        type: 'saved',
        url: testUrl,
        outputPath: expectedPath,
        processed: 1, // Size of visitedUrls *before* adding testUrl
        total: 3,     // Current total pages
        progress: 33, // floor((1 / 3) * 100)
      });
    });
  });

  // --- More tests for other methods (start, addToQueue, processPage, extractLinks, saveMarkdown etc.) will go here ---
  // These will require more extensive mocking of async operations, network, fs, and queue behavior.

});