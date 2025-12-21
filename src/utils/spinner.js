/**
 * Spinner utility for animated CLI progress with colors.
 * Provides multi-line animated display for scraping progress.
 * @module spinner
 */
import chalk from 'chalk';

// Spinner frames for animation (used for scrolling bars)
const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const SCROLLING_BAR_WIDTH = 40;
const PROGRESS_FILLED = '━';
const PROGRESS_EMPTY = '░';
const PROGRESS_WIDTH = 20;
const ESTIMATED_DURATION_MS = 60000; // 60 seconds for full progress bar
const LOG_BUFFER_SIZE = 10; // Number of log lines to show

// Colors for pulsing effect (gentle shades)
const PULSE_COLORS = [
  chalk.green,
  chalk.greenBright,
  chalk.cyan,
  chalk.cyanBright,
  chalk.green,
];

/**
 * Creates an animated spinner for CLI progress display
 * Supports multi-line display with mirrored scrolling bars and log area
 */
class Spinner {
  constructor() {
    this.frameIndex = 0;
    this.pulseIndex = 0;
    this.interval = null;
    this.currentText = '';
    this.isSpinning = false;
    this.startTime = null;
    this.phase = '';
    this.pageCount = 0;
    this.estimatedTotal = 0;
    this.progress = 0; // 0-1 progress value
    this.linesWritten = 0;
    this.url = '';
    this.logBuffer = []; // Rolling log buffer
    this.progressMode = 'time'; // 'time' or 'actual'
  }

  /**
   * Generate a scrolling bar of spinner characters
   * @param {boolean} reverse - Whether to reverse the direction
   * @returns {string} Scrolling bar string
   */
  getScrollingBar(reverse = false) {
    const bar = [];
    for (let i = 0; i < SCROLLING_BAR_WIDTH; i += 1) {
      const idx = reverse
        ? (this.frameIndex + SCROLLING_BAR_WIDTH - i) % SPINNER_FRAMES.length
        : (this.frameIndex + i) % SPINNER_FRAMES.length;
      bar.push(SPINNER_FRAMES[idx]);
    }
    return chalk.cyan(bar.join(''));
  }

  /**
   * Get progress (0-1) based on actual progress or time fallback
   * @returns {number} Progress value between 0 and 1
   */
  getProgress() {
    if (this.progressMode === 'actual' && this.progress > 0) {
      return Math.min(this.progress, 0.95); // Cap at 95% until complete
    }
    // Fallback to time-based
    if (!this.startTime) return 0;
    const elapsed = Date.now() - this.startTime;
    return Math.min(elapsed / ESTIMATED_DURATION_MS, 0.95);
  }

  /**
   * Set the progress value directly (0-1)
   * @param {number} value - Progress value
   * @param {number} [total] - Estimated total pages
   */
  setProgress(value, total) {
    this.progress = value;
    this.progressMode = 'actual';
    if (total !== undefined) {
      this.estimatedTotal = total;
    }
  }

  /**
   * Get elapsed seconds
   * @returns {number} Elapsed time in seconds
   */
  getElapsedSeconds() {
    if (!this.startTime) return 0;
    return (Date.now() - this.startTime) / 1000;
  }

  /**
   * Generate the pulsing progress bar
   * @param {number} progress - Progress value 0-1
   * @returns {string} Colored progress bar
   */
  getPulsingProgressBar(progress) {
    const filled = Math.round(PROGRESS_WIDTH * progress);
    const empty = PROGRESS_WIDTH - filled;
    const pulseColor = PULSE_COLORS[this.pulseIndex % PULSE_COLORS.length];
    return (
      pulseColor(PROGRESS_FILLED.repeat(filled)) +
      chalk.gray(PROGRESS_EMPTY.repeat(empty))
    );
  }

  /**
   * Add a log message to the rolling buffer
   * @param {string} message - Log message to add
   */
  log(message) {
    this.logBuffer.push(message);
    // Keep only the last N messages
    if (this.logBuffer.length > LOG_BUFFER_SIZE) {
      this.logBuffer.shift();
    }
  }

  /**
   * Clear previously written lines and reset cursor
   */
  clearDisplay() {
    if (process.stderr.isTTY && this.linesWritten > 0) {
      // Move up and clear each line we wrote
      for (let i = 0; i < this.linesWritten; i += 1) {
        process.stderr.moveCursor(0, -1);
        process.stderr.clearLine(0);
      }
      process.stderr.cursorTo(0);
    }
  }

  /**
   * Write multi-line display with header, status, logs, and footer
   */
  writeDisplay() {
    if (!process.stderr.isTTY) return;

    this.clearDisplay();

    const topBar = this.getScrollingBar(false);
    const bottomBar = this.getScrollingBar(true); // Mirrored
    const progress = this.getProgress();
    const progressBar = this.getPulsingProgressBar(progress);
    const elapsed = formatDuration(this.getElapsedSeconds());

    // Show page count with estimated total if available
    let pageText;
    if (this.estimatedTotal > 0) {
      pageText = `${this.pageCount} of ~${this.estimatedTotal} pages`;
    } else {
      pageText = `${this.pageCount} pages`;
    }

    // Build the display
    const lines = [];

    // Top scrolling bar
    lines.push(topBar);

    // Header with URL
    lines.push(chalk.bold.white('Slurping ') + chalk.cyan(this.url));
    lines.push(''); // Empty line

    // Status line
    const statusLine = `${chalk.white(this.phase)} ${progressBar}  ${chalk.white(pageText)}  ${chalk.gray(elapsed)}`;
    lines.push(statusLine);
    lines.push(''); // Empty line

    // Log area (pad to fixed height)
    for (let i = 0; i < LOG_BUFFER_SIZE; i += 1) {
      const logMsg = this.logBuffer[i] || '';
      lines.push(chalk.gray('  ' + logMsg));
    }

    // Bottom scrolling bar
    lines.push(bottomBar);

    process.stderr.write(lines.join('\n') + '\n');
    this.linesWritten = lines.length;
  }

  /**
   * Start spinning with phase name and URL
   * @param {string} phase - Phase name (e.g., 'Scraping', 'Compiling')
   * @param {string} [url] - URL being processed
   */
  start(phase = '', url = '') {
    if (this.isSpinning) return;
    this.isSpinning = true;
    this.phase = phase;
    this.url = url;
    this.startTime = Date.now();
    this.pageCount = 0;
    this.linesWritten = 0;
    this.logBuffer = [];

    if (process.stderr.isTTY) {
      this.interval = setInterval(() => {
        this.frameIndex = (this.frameIndex + 1) % SPINNER_FRAMES.length;
        // Advance pulse color every ~200ms (every 2-3 frames at 80ms)
        if (this.frameIndex % 3 === 0) {
          this.pulseIndex = (this.pulseIndex + 1) % PULSE_COLORS.length;
        }
        this.writeDisplay();
      }, 80);
    } else {
      // Non-TTY: just print the phase
      process.stderr.write(`${phase}...\n`);
    }
  }

  /**
   * Update the spinner with new page count
   * @param {string} phase - Phase name
   * @param {number} count - Current page count
   */
  update(phase, count) {
    this.phase = phase;
    if (typeof count === 'number') {
      this.pageCount = count;
    }
    // Display updates automatically via interval
  }

  /**
   * Stop the spinner and clear the display
   */
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    if (process.stderr.isTTY) {
      this.clearDisplay();
    }

    this.isSpinning = false;
    this.linesWritten = 0;
  }

  /**
   * Get a static version of the scrolling bar (frozen frame)
   * @returns {string} Static bar string
   */
  getStaticBar() {
    const bar = [];
    for (let i = 0; i < SCROLLING_BAR_WIDTH; i += 1) {
      bar.push(SPINNER_FRAMES[i % SPINNER_FRAMES.length]);
    }
    return chalk.cyan(bar.join(''));
  }

  /**
   * Stop with a success message showing completed progress bar
   * @param {string} phase - Phase name
   * @param {object} stats - Stats object with count, duration, etc.
   * @param {boolean} showHeader - Whether to show static header bar (first phase only)
   */
  succeed(phase, stats = {}, showHeader = false) {
    this.stop();

    // Print static header bar only for first phase
    if (showHeader) {
      const staticBar = this.getStaticBar();
      process.stderr.write(staticBar + '\n');
    }

    // Show completed state with full progress bar
    const fullBar = chalk.green(PROGRESS_FILLED.repeat(PROGRESS_WIDTH));
    const parts = [chalk.green('✓'), chalk.white(phase), fullBar];

    if (stats.count !== undefined) {
      const label = stats.label || 'items';
      parts.push(chalk.white(formatCount(stats.count, label.slice(0, -1), label)));
    }

    if (stats.duration !== undefined) {
      parts.push(chalk.gray(`(${formatDuration(stats.duration)})`));
    }

    process.stderr.write(parts.join(' ') + '\n');

    // Show failures if any
    if (stats.failed > 0) {
      process.stderr.write(
        chalk.gray('         ') + chalk.yellow(`${stats.failed} failed`) + '\n'
      );
    }
  }

  /**
   * Stop with a failure message
   * @param {string} text - Failure message
   */
  fail(text) {
    this.stop();
    process.stderr.write(chalk.red('✗ ') + text + '\n');
  }

  /**
   * Stop with a warning message
   * @param {string} text - Warning message
   */
  warn(text) {
    this.stop();
    process.stderr.write(chalk.yellow('! ') + text + '\n');
  }
}

/**
 * Create a progress bar string
 * @param {number} current - Current value
 * @param {number} total - Total value (0 for indeterminate)
 * @param {object} options - Options
 * @param {number} [options.width=20] - Bar width in characters
 * @returns {string} Formatted progress bar
 */
function progressBar(current, total, options = {}) {
  const width = options.width || PROGRESS_WIDTH;

  if (total === 0 || total === undefined) {
    // Indeterminate: show a pulsing/moving pattern based on current count
    const pulsePos = current % width;
    let bar = '';
    for (let i = 0; i < width; i += 1) {
      const dist = Math.abs(i - pulsePos);
      if (dist <= 2) {
        bar += chalk.cyan(PROGRESS_FILLED);
      } else {
        bar += chalk.gray(PROGRESS_EMPTY);
      }
    }
    return bar;
  }

  // Determinate progress
  const percent = Math.min(current / total, 1);
  const filled = Math.round(width * percent);
  const empty = width - filled;

  return (
    chalk.green(PROGRESS_FILLED.repeat(filled)) +
    chalk.gray(PROGRESS_EMPTY.repeat(empty))
  );
}

/**
 * Format a duration in seconds to human-readable string
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration
 */
function formatDuration(seconds) {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toFixed(0)}s`;
}

/**
 * Format a count with optional label
 * @param {number} count - The count
 * @param {string} singular - Singular label
 * @param {string} [plural] - Plural label (defaults to singular + 's')
 * @returns {string} Formatted count string
 */
function formatCount(count, singular, plural) {
  const label = count === 1 ? singular : plural || `${singular}s`;
  return `${count} ${label}`;
}

export { Spinner, progressBar, formatDuration, formatCount };
