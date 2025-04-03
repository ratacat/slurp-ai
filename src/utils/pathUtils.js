const path = require('path');
const os = require('os');

/**
 * Resolve a path relative to a given base path.
 * Handles absolute paths, home directory (~), and relative paths.
 * @param {string} relativePath - Path to resolve.
 * @param {string} basePath - The base path to resolve against.
 * @returns {string} Absolute path.
 */
function resolvePath(relativePath, basePath) {
  if (!relativePath) return basePath;

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
  return path.join(basePath, relativePath);
}

module.exports = { resolvePath };