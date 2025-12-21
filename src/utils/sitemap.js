/**
 * Sitemap utilities for estimating page counts before scraping.
 * @module sitemap
 */

import { log } from './logger.js';

/**
 * Fetch and parse a sitemap to get URL count matching a base path.
 * Handles both XML sitemaps and sitemap indexes.
 *
 * @param {string} baseUrl - The base URL of the site (e.g., https://docs.example.com)
 * @param {string} [basePath] - Optional path prefix to filter URLs (e.g., /en/docs/)
 * @param {number} [timeout=5000] - Timeout for fetch in ms
 * @returns {Promise<{found: boolean, urls: string[], count: number}>}
 */
async function fetchSitemap(baseUrl, basePath = '', timeout = 5000) {
  const result = { found: false, urls: [], count: 0 };

  try {
    const urlObj = new URL(baseUrl);
    const sitemapUrl = `${urlObj.origin}/sitemap.xml`;

    log.verbose(`Checking for sitemap at ${sitemapUrl}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(sitemapUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'SlurpAI/1.0 (Documentation Scraper)',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      log.verbose(`No sitemap found (${response.status})`);
      return result;
    }

    const xml = await response.text();

    // Check if it's a sitemap index (contains other sitemaps)
    if (xml.includes('<sitemapindex')) {
      log.verbose('Found sitemap index, parsing nested sitemaps...');
      const urls = await parseSitemapIndex(xml, basePath, timeout);
      result.found = true;
      result.urls = urls;
      result.count = urls.length;
    } else {
      // Regular sitemap
      const urls = parseSitemapXml(xml, basePath);
      result.found = true;
      result.urls = urls;
      result.count = urls.length;
    }

    log.verbose(`Sitemap: found ${result.count} URLs matching path`);
    return result;
  } catch (error) {
    if (error.name === 'AbortError') {
      log.verbose('Sitemap fetch timed out');
    } else {
      log.verbose(`Sitemap fetch error: ${error.message}`);
    }
    return result;
  }
}

/**
 * Parse a sitemap XML and extract URLs matching basePath.
 *
 * @param {string} xml - The sitemap XML content
 * @param {string} basePath - Path prefix to filter URLs
 * @returns {string[]} Array of matching URLs
 */
function parseSitemapXml(xml, basePath = '') {
  const urls = [];

  // Simple regex-based parsing (avoids XML parser dependency)
  const locRegex = /<loc>\s*(.*?)\s*<\/loc>/gi;
  let match;

  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1].trim();

    // Filter by basePath if provided
    if (basePath) {
      try {
        const urlObj = new URL(url);
        if (urlObj.pathname.startsWith(basePath) || url.startsWith(basePath)) {
          urls.push(url);
        }
      } catch {
        // Skip invalid URLs
      }
    } else {
      urls.push(url);
    }
  }

  return urls;
}

/**
 * Parse a sitemap index and fetch nested sitemaps.
 *
 * @param {string} xml - The sitemap index XML content
 * @param {string} basePath - Path prefix to filter URLs
 * @param {number} timeout - Timeout for each fetch
 * @returns {Promise<string[]>} Array of all matching URLs from nested sitemaps
 */
async function parseSitemapIndex(xml, basePath, timeout) {
  const allUrls = [];
  const sitemapUrls = [];

  // Extract sitemap URLs from index
  const locRegex = /<loc>\s*(.*?)\s*<\/loc>/gi;
  let match;

  while ((match = locRegex.exec(xml)) !== null) {
    sitemapUrls.push(match[1].trim());
  }

  // Fetch each nested sitemap (limit to first 5 to avoid too many requests)
  const sitemapsToFetch = sitemapUrls.slice(0, 5);

  for (const sitemapUrl of sitemapsToFetch) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(sitemapUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'SlurpAI/1.0 (Documentation Scraper)',
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const nestedXml = await response.text();
        const urls = parseSitemapXml(nestedXml, basePath);
        allUrls.push(...urls);
      }
    } catch {
      // Skip failed sitemaps
    }
  }

  return allUrls;
}

/**
 * Estimate total pages based on current scraping progress.
 * Uses discovered links and average processing time.
 */
class ProgressEstimator {
  constructor() {
    this.processedCount = 0;
    this.totalTimeMs = 0;
    this.discoveredUrls = new Set();
    this.estimatedTotal = 0;
    this.sitemapCount = 0;
    this.startTime = null;
  }

  /**
   * Set the initial estimate from sitemap.
   * @param {number} count - Number of URLs found in sitemap
   */
  setSitemapEstimate(count) {
    this.sitemapCount = count;
    this.estimatedTotal = count;
  }

  /**
   * Record a discovered URL.
   * @param {string} url - The discovered URL
   */
  addDiscoveredUrl(url) {
    this.discoveredUrls.add(url);
    this.updateEstimate();
  }

  /**
   * Record a completed page.
   * @param {number} durationMs - How long this page took
   */
  recordCompletion(durationMs) {
    this.processedCount += 1;
    this.totalTimeMs += durationMs;
    this.updateEstimate();
  }

  /**
   * Start timing.
   */
  start() {
    this.startTime = Date.now();
  }

  /**
   * Update the estimated total based on current data.
   */
  updateEstimate() {
    // If we have a sitemap count, use that as the baseline
    if (this.sitemapCount > 0) {
      this.estimatedTotal = this.sitemapCount;
      return;
    }

    // Otherwise, estimate from discovered URLs
    // As we process more, we discover more links - estimate includes unprocessed discoveries
    const discoveredCount = this.discoveredUrls.size;

    if (this.processedCount > 0) {
      // Average discovery rate: how many new URLs per page processed
      const avgDiscoveryRate = discoveredCount / this.processedCount;

      // Project forward: remaining discovered + potential new discoveries
      const remaining = discoveredCount - this.processedCount;
      const projectedNew = remaining * avgDiscoveryRate * 0.5; // Decay factor

      this.estimatedTotal = Math.ceil(
        this.processedCount + remaining + projectedNew
      );
    } else {
      this.estimatedTotal = Math.max(discoveredCount, 1);
    }
  }

  /**
   * Get current progress as a fraction (0-1).
   * @returns {number} Progress value
   */
  getProgress() {
    if (this.estimatedTotal === 0) return 0;
    return Math.min(this.processedCount / this.estimatedTotal, 0.99);
  }

  /**
   * Get estimated time remaining in seconds.
   * @returns {number|null} Estimated seconds remaining, or null if unknown
   */
  getEstimatedTimeRemaining() {
    if (this.processedCount === 0) return null;

    const avgTimePerPage = this.totalTimeMs / this.processedCount;
    const remaining = this.estimatedTotal - this.processedCount;

    return (remaining * avgTimePerPage) / 1000;
  }

  /**
   * Get a summary string for display.
   * @returns {string} Progress summary
   */
  getSummary() {
    const remaining = this.estimatedTotal - this.processedCount;
    if (this.sitemapCount > 0) {
      return `${this.processedCount} of ${this.estimatedTotal} pages`;
    }
    return `${this.processedCount} pages (~${remaining} remaining)`;
  }
}

export { fetchSitemap, parseSitemapXml, ProgressEstimator };
