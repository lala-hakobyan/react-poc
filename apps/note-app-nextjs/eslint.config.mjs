import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Our custom overrides
  {
    rules: {
      // 2 spaces indentation
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
];

export default eslintConfig;
