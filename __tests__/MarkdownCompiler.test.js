// __tests__/MarkdownCompiler.test.js
import { describe, it, expect } from 'vitest';
import { MarkdownCompiler } from '../src/MarkdownCompiler.js';

describe('MarkdownCompiler', () => {
  describe('cleanupContent', () => {
    it('removes content matching exclude patterns', () => {
      const compiler = new MarkdownCompiler({
        removeNavigation: true,
        // Use a simple custom pattern for testing
        excludePatterns: [/REMOVE ME/gi],
      });
      const content = 'Some text\n\nREMOVE ME section\n\nMore text.';
      const cleaned = compiler.cleanupContent(content);
      // Pattern removed, then cleanup applied
      const finalExpected = 'Some text\n\nMore text.';
      expect(cleaned).toBe(finalExpected);
    });
  });
});
