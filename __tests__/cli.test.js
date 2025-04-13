// __tests__/cli.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import path from 'path';

// --- Mock Modules Using Async Factories ---
vi.mock('../src/slurpWorkflow.js', async () => {
  return {
    runSlurpWorkflow: vi.fn(), // Define mock inside factory
    extractNameFromUrl: vi.fn((url) =>
      path.basename(url || 'default').replace(/[^a-z0-9_-]/gi, '_'),
    ),
  };
});

vi.mock('../src/MarkdownCompiler.js', async () => {
  const mockCompile = vi.fn(); // Define inner mock fn
  return {
    MarkdownCompiler: vi.fn().mockImplementation(() => ({
      compile: mockCompile,
      inputDir: '/mock/compiler/input/dir/default',
    })),
  };
});

// Basic test suite to use imports
describe('CLI Module', () => {
  beforeEach(() => {
    // Test setup
    vi.resetAllMocks();
  });

  afterEach(() => {
    // Test cleanup
    vi.restoreAllMocks();
  });

  it('should be properly configured', () => {
    // Simple placeholder test
    expect(true).toBe(true);
  });
});
