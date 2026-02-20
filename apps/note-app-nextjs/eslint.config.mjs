import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  {
    // Ignore static public files (like service workers) so React rules don't scan them and crash
    ignores: ['**/*', '!src/**'],
  },
  ...nextVitals,
  ...nextTs,
  // Our custom overrides
  {
    rules: {
      // 1 space indentation
      indent: ['error', 2, { SwitchCase: 1 }],

      // Single quotes in JS/TS, allow double for escaping
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

      // Double quotes in JSX attributes
      'jsx-quotes': ['error', 'prefer-double'],

      // Enforce spaces inside curly braces for better readability:
      // import { NextResponse } from 'next/server'; instead of import {NextResponse} from 'next/server';
      'object-curly-spacing': ['error', 'always']
    },
  },
]);

export default eslintConfig;


