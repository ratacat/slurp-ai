/**
 * Enhanced logger utility for SlurpAI with structured log levels and emoji indicators.
 * Respects the --verbose flag and debug configuration.
 * @module logger
 */
import chalk from 'chalk';
import { scraping } from '../../config.js';

// Check for verbose mode from either config debug setting or command line arguments
const verbose = scraping.debug || process.argv.includes('--verbose');

// Fallback for chalk if needed in certain environments
const chalkFallback = { 
  green: (s) => s, 
  red: (s) => s, 
  yellow: (s) => s, 
  blue: (s) => s, 
  gray: (s) => s,
  magenta: (s) => s
};

// Use chalk if available, fallback otherwise
const chalkLib = chalk || chalkFallback;

/**
 * Logger utility with structured log levels and emoji indicators
 */
const log = {
  /**
   * Logs the start of a major phase or operation
   * @param {string} stage - The stage/phase name (e.g., 'Scraping', 'Compiling', 'Cleanup', 'Init')
   * @param {string} message - The message to log
   */
  start: (stage, message) => {
    const emojiMap = { 
      Scraping: '🔎', 
      Compiling: '⚙️', 
      Cleanup: '🧹', 
      Init: '🚀' 
    };
    console.error(`${emojiMap[stage] || 'ℹ️'} [${stage}] ${message}`);
  },

  /**
   * Logs an iterative progress update
   * @param {string} message - The progress message to log
   */
  progress: (message) => {
    console.error(chalkLib.blue(`   ➡️ ${message}`));
  },

  /**
   * Logs a successful completion of a stage
   * @param {string} stage - The stage/phase name
   * @param {string} message - The success message to log
   */
  success: (stage, message) => {
    console.error(chalkLib.green(`   ✅ [${stage}] ${message}`));
  },

  /**
   * Logs a warning or non-critical issue
   * @param {string} stage - The stage/phase name (optional)
   * @param {string} message - The warning message to log
   */
  warn: (stage, message) => {
    console.error(chalkLib.yellow(`   ⚠️ ${stage ? `[${stage}] ` : ''}${message}`));
  },

  /**
   * Logs a critical error
   * @param {string} stage - The stage/phase name (optional)
   * @param {string} message - The error message to log
   */
  error: (stage, message) => {
    console.error(chalkLib.red(`   ❌ ${stage ? `[${stage}] ` : ''}${message}`));
  },

  /**
   * Logs the final success message at the end of a process
   * @param {string} message - The final success message to log
   */
  final: (message) => {
    console.error(chalkLib.magenta(`\n✨ ${message}`));
  },

  /**
   * Logs detailed information only when verbose mode is enabled
   * Only shown when --verbose flag is passed or SLURP_VERBOSE=true is set
   * @param {*} message - The verbose message to log
   */
  verbose: (message) => {
    if (verbose) {
      const msgString = typeof message === 'string' ? message : JSON.stringify(message);
      console.error(chalkLib.gray(`[VERBOSE] ${msgString}`));
    }
  },

  /**
   * Logs a simple informational message for backward compatibility
   * @param {*} message - The message to log
   */
  info: (message) => {
    const msgString = typeof message === 'string' ? message : JSON.stringify(message);
    console.error(`   ${msgString}`);
  }
};

export { log };