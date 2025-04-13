// __tests__/utils/pathUtils.test.js
import { describe, it, expect, vi } from 'vitest';
import path from 'path';
import os from 'os';
import { resolvePath } from '../../src/utils/pathUtils.js';

// Mock os.homedir() for consistent testing across environments
vi.mock('os', async (importOriginal) => {
  const originalOs = await importOriginal();
  return {
    ...originalOs,
    homedir: vi.fn(() => '/mock/home/user'), // Use a consistent mock home directory
  };
});

describe('resolvePath utility', () => {
  const basePath = '/users/test/project';

  it('should return the base path if relativePath is empty or null', () => {
    expect(resolvePath('', basePath)).toBe(basePath);
    expect(resolvePath(null, basePath)).toBe(basePath);
    expect(resolvePath(undefined, basePath)).toBe(basePath);
  });

  it('should return the path directly if it is absolute', () => {
    const absolutePath = '/var/log/app.log';
    // Use path.sep to handle Windows vs Unix paths if necessary, though input is Unix-style
    expect(resolvePath(absolutePath, basePath)).toBe(absolutePath);
    // Example for Windows-style path if needed (adjust basePath accordingly)
    // const winAbsolutePath = 'C:\\Users\\Test\\file.txt';
    // expect(resolvePath(winAbsolutePath, 'C:\\Users\\Test\\project')).toBe(winAbsolutePath);
  });

  it('should resolve paths starting with ~ relative to the home directory', () => {
    expect(resolvePath('~/documents/file.txt', basePath)).toBe(
      path.join(os.homedir(), 'documents/file.txt'),
    );
    expect(resolvePath('~/.config', basePath)).toBe(
      path.join(os.homedir(), '.config'),
    );
  });

  it('should resolve relative paths against the base path', () => {
    expect(resolvePath('src/utils', basePath)).toBe(
      path.join(basePath, 'src/utils'),
    );
    expect(resolvePath('../data', basePath)).toBe(
      path.join(basePath, '../data'),
    ); // Resolves to /users/test/data
    expect(resolvePath('./config.json', basePath)).toBe(
      path.join(basePath, 'config.json'),
    );
  });
});
