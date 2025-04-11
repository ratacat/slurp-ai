/**
 * Enhanced logger utility for SlurpAI with structured log levels and emoji indicators.
 * Respects the --verbose flag and SLURP_VERBOSE environment variable.
 * @module logger
 */
import chalk from 'chalk';

// Check for verbose mode from either environment variable or command line arguments
const verbose = process.env.SLURP_VERBOSE === 'true' || process.argv.includes('--verbose');

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
    console.error(chalkLib.blue(`   ➡️ ${message}`)); // Indented progress
  },

  /**
   * Logs a successful completion of a stage
   * @param {string} stage - The stage/phase name
   * @param {string} message - The success message to log
   */
  success: (stage, message) => {
    console.error(chalkLib.green(`   ✅ [${stage}] ${message}`)); // Indented success
  },

  /**
   * Logs a warning or non-critical issue
   * @param {string} stage - The stage/phase name (optional)
   * @param {string} message - The warning message to log
   */
  warn: (stage, message) => {
    console.error(chalkLib.yellow(`   ⚠️ ${stage ? `[${stage}] ` : ''}${message}`)); // Indented warning
  },

  /**
   * Logs a critical error
   * @param {string} stage - The stage/phase name (optional)
   * @param {string} message - The error message to log
   */
  error: (stage, message) => {
    console.error(chalkLib.red(`   ❌ ${stage ? `[${stage}] ` : ''}${message}`)); // Indented error to stderr
  },

  /**
   * Logs the final success message at the end of a process
   * @param {string} message - The final success message to log
   */
  final: (message) => {
    console.error(chalkLib.magenta(`\n✨ ${message}`)); // Final success message
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
    console.error(`   ${msgString}`); // Indented info message
  }
};

export { log };