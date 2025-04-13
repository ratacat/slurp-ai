/**
 * Configuration for SlurpAI - defines all application settings with hardcoded values
 */

import process from 'process';

const config = {
  // File system paths
  paths: {
    basePath: null,
    inputDir: 'slurps_partials',
    outputDir: 'slurps',
  },
  
  // Web scraping settings
  scraping: {
    maxPagesPerSite: 100,
    concurrency: 25,
    retryCount: 3,
    retryDelay: 1000,
    useHeadless: false,
    debug: false,
    timeout: 60000,
  },
  
  // URL filtering options
  urlFiltering: {
    enforceBasePath: true,
    preserveQueryParams: ['version', 'lang', 'theme'],
    depthNumberOfSegments: 5,
    depthSegmentCheck: ['api', 'reference', 'guide', 'tutorial', 'example', 'doc'],
  },
  
  // Markdown compilation options
  compilation: {
    preserveMetadata: true,
    removeNavigation: true,
    removeDuplicates: true,
    similarityThreshold: 0.9,
  }
};

export default config;

// Named exports for specific configuration sections
export const { paths, scraping, urlFiltering, compilation } = config;
