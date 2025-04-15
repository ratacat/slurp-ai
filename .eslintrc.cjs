module.exports = {
  env: {
    browser: false, // Assuming Node.js project, adjust if browser code is present
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended', // Integrates Prettier rules into ESLint
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'prettier', // Runs Prettier as an ESLint rule
  ],
  rules: {
    'prettier/prettier': 'error', // Report Prettier rule violations as ESLint errors
    'no-console': 'warn', // Discourage console.log, use logger instead (as per rules)
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        // Require .js extensions for ESM compatibility
        js: 'always',
      },
    ],
    'import/prefer-default-export': 'off', // Disable preference for default exports, allowing named exports
    'import/no-unresolved': 'off', // Disable unresolved import checks that are causing issues with p-queue and @modelcontextprotocol/sdk
    // Add any project-specific rule overrides here if necessary
    // e.g., 'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'coverage/',
    'slurp_docs/',
    'slurp_partials/',
    'slurps/',
    'slurps_partials/',
    '.env',
    'package-lock.json',
    '__tests__',
    // Add other generated/ignored directories or files
  ],
  overrides: [
    {
      files: ['src/utils/logger.js'],
      rules: {
        'no-console': 'off', // Disable no-console specifically for logger.js
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'], // Specify extensions to resolve
      },
    },
  },
};
