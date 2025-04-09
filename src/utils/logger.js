/**
 * Simple logger utility that respects the SLURP_DEBUG and SLURP_VERBOSE environment variables.
 */
// Convert to ESM import
import chalk from 'chalk';
// Fallback for chalk if needed
const chalkFallback = { green: (s) => s, red: (s) => s, yellow: (s) => s, blue: (s) => s, gray: (s) => s };
const chalkLib = chalk || chalkFallback;

const logger = {
  /**
   * Logs an informational message. Always displayed.
   * @param {*} message - The message to log.
   */
  info: (message) => {
    const msgString = typeof message === 'string' ? message : JSON.stringify(message);
    console.log(msgString);
  },

  /**
   * Logs a success message. Always displayed with a checkmark.
   * @param {*} message - The message to log.
   */
  success: (message) => {
    const msgString = typeof message === 'string' ? message : JSON.stringify(message);
    console.log(chalkLib.green(`✅ ${msgString}`));
  },

  /**
   * Logs an error message. Always displayed with a cross mark.
   * @param {*} message - The message to log.
   */
  error: (message) => {
    const msgString = typeof message === 'string' ? message : JSON.stringify(message);
    console.error(chalkLib.red(`❌ ${msgString}`));
  },

  /**
   * Logs a warning message. Always displayed with a warning symbol.
   * @param {*} message - The message to log.
   */
  warn: (message) => {
    const msgString = typeof message === 'string' ? message : JSON.stringify(message);
    console.log(chalkLib.yellow(`⚠️ ${msgString}`));
  },

  /**
   * Logs a verbose message only if SLURP_VERBOSE is 'true'.
   * @param {*} message - The message to log.
   */
  verbose: (message) => {
    if (process.env.SLURP_VERBOSE === 'true') {
      const msgString = typeof message === 'string' ? message : JSON.stringify(message);
      console.log(chalkLib.gray(`[VERBOSE] ${msgString}`));
    }
  },

  /**
   * Logs a debug message only if SLURP_DEBUG is 'true'.
   * @param {*} message - The message to log.
   */
  debug: (message) => {
    if (process.env.SLURP_DEBUG === 'true') {
      const msgString = typeof message === 'string' ? message : JSON.stringify(message);
      console.log(`[DEBUG] ${msgString}`);
    }
  },

   /**
   * Logs a progress message. Only displayed if SLURP_VERBOSE or SLURP_DEBUG is 'true'.
   * @param {*} message - The message to log.
   */
   progress: (message) => {
    if (process.env.SLURP_VERBOSE === 'true' || process.env.SLURP_DEBUG === 'true') {
      const msgString = typeof message === 'string' ? message : JSON.stringify(message);
      console.log(chalkLib.blue(`[PROGRESS] ${msgString}`));
    }
  },

  /**
   * Logs a summary section. Always displayed.
   * @param {string} title - The title of the summary.
   * @param {object} items - Key-value pairs for the summary details.
   */
  summary: (title, items) => {
    console.log(`\n${title}:`);
    for (const [key, value] of Object.entries(items)) {
      console.log(`${key}: ${value}`);
    }
  }
};

// Export as 'log' to match usage in cli.js and workflow
export const log = logger;