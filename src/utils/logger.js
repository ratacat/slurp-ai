/**
 * Enhanced logger utility for SlurpAI with clean, colored output.
 * Supports both TTY (interactive) and non-TTY (piped) modes.
 * @module logger
 */
import chalk from 'chalk';
import { scraping } from '../../config.js';
import { Spinner, formatDuration, formatCount } from './spinner.js';

// Check for verbose mode from either config debug setting or command line arguments
const verbose = scraping.debug || process.argv.includes('--verbose');

// Shared spinner instance for coordinated output
let activeSpinner = null;

/**
 * Logger utility with clean, colored output
 */
const log = {
  /**
   * Get or create the shared spinner instance
   * @returns {Spinner} The active spinner
   */
  getSpinner() {
    if (!activeSpinner) {
      activeSpinner = new Spinner();
    }
    return activeSpinner;
  },

  /**
   * Print a header for the slurp operation (legacy - now integrated into spinner)
   * @param {string} url - The URL being slurped
   */
  header(url) {
    // Store URL for use in spinnerStart
    this._currentUrl = url;
  },

  /**
   * Start a spinner for an ongoing operation
   * @param {string} phase - Phase name (e.g., 'Scraping', 'Compiling')
   * @param {string} message - Initial message (unused in new display, kept for compatibility)
   */
  spinnerStart(phase, message) {
    const spinner = this.getSpinner();
    spinner.start(phase, this._currentUrl || '');
  },

  /**
   * Add a log message to the spinner's rolling log buffer
   * @param {string} message - Log message to display
   */
  spinnerLog(message) {
    const spinner = this.getSpinner();
    if (spinner.isSpinning) {
      spinner.log(message);
    }
  },

  /**
   * Set the spinner's progress value
   * @param {number} value - Progress value (0-1)
   * @param {number} [total] - Estimated total pages
   */
  spinnerSetProgress(value, total) {
    const spinner = this.getSpinner();
    if (spinner.isSpinning) {
      spinner.setProgress(value, total);
    }
  },

  /**
   * Update the spinner with new progress
   * @param {string} phase - Phase name
   * @param {string} message - Progress message (e.g., "32 pages found")
   * @param {object} [stats] - Optional stats object
   * @param {number} [stats.current] - Current count
   * @param {number} [stats.inFlight] - Items in progress
   */
  spinnerUpdate(phase, message, stats = {}) {
    const spinner = this.getSpinner();
    // Extract page count from message like "32 pages found"
    const match = message.match(/^(\d+)/);
    const count = match ? parseInt(match[1], 10) : undefined;
    spinner.update(phase, count);
  },

  /**
   * Stop the spinner with a success summary
   * @param {string} phase - Phase name
   * @param {object} stats - Completion stats
   * @param {boolean} showHeader - Whether to show static header bar
   */
  spinnerSucceed(phase, stats = {}, showHeader = false) {
    const spinner = this.getSpinner();
    spinner.succeed(phase, stats, showHeader);
  },

  /**
   * Stop the spinner with a failure message
   * @param {string} phase - Phase name
   * @param {string} message - Error message
   */
  spinnerFail(phase, message) {
    const spinner = this.getSpinner();
    spinner.fail(`${chalk.bold(phase)} ${chalk.red(message)}`);
  },

  /**
   * Format a number with commas for readability
   * @param {number} num - Number to format
   * @returns {string} Formatted number string
   */
  formatNumber(num) {
    return num.toLocaleString();
  },

  /**
   * Print final success message with structured output and stats
   * @param {string} outputPath - Relative path to the output file
   * @param {string} [fullPath] - Optional absolute path to the output file
   * @param {object} [stats] - Optional token statistics
   */
  done(outputPath, fullPath, stats) {
    const absolutePath = fullPath || outputPath;

    // Get static bar from spinner for footer
    const spinner = this.getSpinner();
    const staticBar = spinner.getStaticBar();

    console.error('');
    console.error(chalk.gray('→ ') + chalk.gray(outputPath));
    console.error(chalk.gray('→ ') + chalk.gray(absolutePath));

    // Display token statistics if available
    if (stats && (stats.rawHtmlTokens > 0 || stats.rawTokens > 0)) {
      console.error('');

      const startTokens = stats.rawHtmlTokens || stats.rawTokens;
      const totalReduction = startTokens - stats.cleanedTokens;
      const totalPercent = ((totalReduction / startTokens) * 100).toFixed(1);

      console.error(
        chalk.gray('  ') +
          chalk.white(this.formatNumber(startTokens)) +
          chalk.gray(' tokens → ') +
          chalk.white(this.formatNumber(stats.cleanedTokens)) +
          chalk.gray(' tokens ') +
          chalk.green(`(${totalPercent}% reduction)`),
      );
    }

    console.error('');
    console.error(staticBar);
    console.error('');
  },

  /**
   * Print a simple info line (not part of spinner)
   * @param {string} message - Message to print
   */
  info(message) {
    // Stop spinner temporarily if active
    const spinner = this.getSpinner();
    const wasSpinning = spinner.isSpinning;
    if (wasSpinning) {
      spinner.stop();
    }

    console.error(chalk.gray(`  ${message}`));

    if (wasSpinning) {
      spinner.start(spinner.currentText);
    }
  },

  /**
   * Print a warning message
   * @param {string} phase - Phase name (optional)
   * @param {string} message - Warning message
   */
  warn(phase, message) {
    const spinner = this.getSpinner();
    const wasSpinning = spinner.isSpinning;
    if (wasSpinning) {
      spinner.stop();
    }

    const prefix = phase ? chalk.yellow(`[${phase}] `) : '';
    console.error(chalk.yellow('! ') + prefix + message);

    if (wasSpinning) {
      spinner.start(spinner.currentText);
    }
  },

  /**
   * Print an error message
   * @param {string} phase - Phase name (optional)
   * @param {string} message - Error message
   */
  error(phase, message) {
    const spinner = this.getSpinner();
    if (spinner.isSpinning) {
      spinner.stop();
    }

    const prefix = phase ? chalk.red(`[${phase}] `) : '';
    console.error(chalk.red('✗ ') + prefix + message);
  },

  /**
   * Log verbose/debug information (only when --verbose flag is set)
   * @param {*} message - Message to log
   */
  verbose(message) {
    if (!verbose) return;

    const spinner = this.getSpinner();
    const wasSpinning = spinner.isSpinning;
    if (wasSpinning) {
      spinner.stop();
    }

    const msgString =
      typeof message === 'string' ? message : JSON.stringify(message);
    console.error(chalk.gray(`  [debug] ${msgString}`));

    if (wasSpinning) {
      spinner.start(spinner.currentText);
    }
  },

  // ============================================
  // Legacy methods for backward compatibility
  // ============================================

  /**
   * @deprecated Use spinnerStart instead
   */
  start(stage, message) {
    // Map to new spinner-based output
    this.spinnerStart(stage, message);
  },

  /**
   * @deprecated Use spinnerUpdate instead
   */
  progress(message) {
    // For now, just update current spinner
    const spinner = this.getSpinner();
    if (spinner.isSpinning) {
      spinner.update(message);
    } else {
      console.error(chalk.blue('  → ') + message);
    }
  },

  /**
   * @deprecated Use spinnerSucceed instead
   */
  success(stage, message) {
    // Stop spinner and show success
    const spinner = this.getSpinner();
    spinner.succeed(`${chalk.bold(stage)} ${message}`);
  },

  /**
   * @deprecated Use done instead
   */
  final(message) {
    console.error('');
    console.error(chalk.green('✓ ') + chalk.bold(message));
    console.error('');
  },
};

export { log };
