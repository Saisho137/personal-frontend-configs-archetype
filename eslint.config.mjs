import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    name: 'global-ignores',
    ignores: [
      '**/node_modules/**',
      '**/package.json',
      '**/package-lock.json',
      '**/tsconfig.json',
      '**/.next/**',
      '**/public/**',
      '**/dist/**',
      '**/build/**',
      '**/.git/**'
    ]
  },
  {
    name: 'custom-rules',
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }
      ],
      '@typescript-eslint/no-unused-expressions': [
        'warn',
        {
          allowShortCircuit: true,
          allowTernary: true
        }
      ],

      // Code quality rules
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error']
        }
      ],
      'no-debugger': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0
        }
      ],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': ['warn', 'always'],
      'prefer-template': 'warn',
      'no-throw-literal': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      // Import organization
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: './**.module.{css,scss}',
              group: 'sibling',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          distinctGroup: true
        }
      ],
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/no-unresolved': 'off', // TypeScript handles this
      'import/newline-after-import': ['warn', { count: 1 }],

      // React specific rules
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never'
        }
      ],
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];

export default config;
