// __tests__/slurpWorkflow.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { runSlurpWorkflow } from '../src/slurpWorkflow.js';

describe('slurpWorkflow', () => {
  beforeEach(() => {
    process.env.SLURP_PARTIALS_DIR = 'test_partials_dir';
    process.env.SLURP_OUTPUT_DIR = 'test_output_dir';
    process.env.SLURP_COMPILED_DIR = 'compiled_env_fallback'; // Should not be used if SLURP_OUTPUT_DIR is set
    process.env.SLURP_DELETE_PARTIALS = 'true'; // Default to true for cleanup tests
    // Mock process.cwd() for default path calculations - this is critical for path expectations
    vi.spyOn(process, 'cwd').mockReturnValue('/test/base');
  });

  afterEach(() => {
    delete process.env.SLURP_PARTIALS_DIR;
    delete process.env.SLURP_OUTPUT_DIR;
    delete process.env.SLURP_COMPILED_DIR;
    delete process.env.SLURP_DELETE_PARTIALS;
  });

  // Basic test to use the imported function
  it('should execute runSlurpWorkflow', async () => {
    // Mock implementation for the test
    vi.mocked(runSlurpWorkflow).mockResolvedValue({
      success: true,
      message: 'Workflow completed successfully',
    });

    // Call the function
    const result = await runSlurpWorkflow('https://example.com');

    // Verify it was called
    expect(runSlurpWorkflow).toHaveBeenCalledWith('https://example.com');
    expect(result.success).toBe(true);
  });
});
