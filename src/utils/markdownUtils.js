/**
 * Apply general cleanup rules to markdown content.
 * Fixes excessive blank lines, spacing around headings, list formatting, etc.
 * @param {string} markdown - The markdown content to clean up.
 * @returns {string} The cleaned markdown content.
 */
function cleanupMarkdown(markdown) {
  if (!markdown) return '';

  return markdown
    // Fix navigation elements with excessive whitespace
    .replace(/\*\s+\[\s+\n+\s+([^\n]+)\s+\n+\s+\n+\s+\n+\s+\]\(([^)]+)\)/g, '* [$1]($2)')

    // Clean up excessive blank lines
    .replace(/\n{3,}/g, '\n\n')

    // Ensure proper spacing around headings
    .replace(/\n{2,}(#{1,6}\s)/g, '\n\n$1')
    .replace(/^(#{1,6}\s.*)\n{3,}/gm, '$1\n\n')

    // Fix list formatting
    .replace(/\n{2,}(\*\s)/g, '\n$1')
    .replace(/(\*\s.*)\n{2,}(\*\s)/g, '$1\n$2')

    // Clean up code blocks
    .replace(/```\n{2,}/g, '```\n')
    .replace(/\n{2,}```/g, '\n```')

    // Remove empty list items
    .replace(/\*\s*\n\s*\*/g, '*')

    // Trim leading/trailing whitespace
    .trim();
}
export { cleanupMarkdown };