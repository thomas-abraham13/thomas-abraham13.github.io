module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['build/', 'node_modules/'],
  rules: {
    'prefer-template': 0,
    'linebreak-style': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
    // React 17+ JSX transform: React does not need to be in scope.
    'react/react-in-jsx-scope': 0,
    'react/jsx-uses-react': 0,
    // Function components use default parameters; defaultProps is removed in React 19.
    'react/require-default-props': [2, { functions: 'defaultArguments' }],
  },
  overrides: [
    {
      files: ['vite.config.js'],
      rules: {
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
      },
    },
    {
      files: ['src/test/**', '**/*.test.jsx'],
      env: { node: true },
      globals: {
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
      rules: {
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
      },
    },
  ],
};
