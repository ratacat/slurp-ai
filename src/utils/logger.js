/**
 * Simple logger utility that respects the SLURP_DEBUG environment variable.
 */
const logger = {
  /**
   * Logs a debug message if SLURP_DEBUG is set to 'true'.
   * Ensures the message is converted to a string before logging.
   * @param {*} message - The message to log. Can be any type, will be stringified if not a string.
   */
  debug: (message) => {
    if (process.env.SLURP_DEBUG === "true") {
      // Ensure message is a string before prefixing
      const msgString =
        typeof message === "string" ? message : JSON.stringify(message);
      console.log(`[DEBUG] ${msgString}`);
    }
  },

  warn: (message) => {
    const msgString =
      typeof message === "string" ? message : JSON.stringify(message);
    console.warn(`[WARN] ${msgString}`);
  },

  error: (message) => {
    const msgString =
      typeof message === "string" ? message : JSON.stringify(message);
    console.error(`[ERROR] ${msgString}`);
  },
};

module.exports = logger;
