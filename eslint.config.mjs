import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginNext from '@next/eslint-plugin-next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ...compat.extends(
  //   'next/core-web-vitals',
  //   'next/typescript',
  //   'plugin:prettier/recommended'
  // ),
  // compat.rules({
  //   '@typescript-eslint/no-unused-vars': [
  //     'warn',
  //     { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  //   ],
  //   'prettier/prettier': ['error', { endOfLine: 'auto' }],
  //   '@typescript-eslint/no-unsafe-function-type': 'off',
  //   '@typescript-eslint/no-explicit-any': 'off',
  //   '@typescript-eslint/no-unused-vars': [
  //     'warn',
  //     { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  //   ],
  // }),
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:prettier/recommended',
    ],
    rules: {
      ...pluginNext.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  }),
];

export default eslintConfig;
