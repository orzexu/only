import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.jsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'react/jsx-runtime': 'off',
      'react/react-in-jsx-scope': 'off',
      "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "none",
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ]
    },
  },
  {
    files: ['**/webpack*.js', '**/*.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];