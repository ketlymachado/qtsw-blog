import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from '@stylistic/eslint-plugin-ts';
import sonarjs from 'eslint-plugin-sonarjs';
import unusedImports from 'eslint-plugin-unused-imports'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
      'unused-imports': unusedImports
    },
    languageOptions: { globals: globals.browser },
    rules: {
      '@stylistic/ts/semi': ["error", "always"],
      'no-redeclare': "error"
      "@stylistic/ts/quotes": ["error", "double"],
      "@stylistic/ts/indent": ["error", 2],
      "@stylistic/ts/comma-dangle": ["error", "always-multiline"],
      'no-empty-function': "off",
      '@typescript-eslint/no-empty-function': "error",
      '@typescript-eslint/no-use-before-define': "error",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
      ],
      '@stylistic/ts/indent': ["error", "tab"],
      "camelcase": ["error", { "properties": "always" }],
      '@stylistic/ts/indent': ["error", "tab"],
      "camelcase": ["error", { "properties": "always" }],
      "no-magic-numbers": ["error", { "ignore": [0, 1, -1], "ignoreArrayIndexes": true }],
      '@stylistic/ts/lines-around-comment': ["error", { "beforeLineComment": true }],
      '@stylistic/ts/no-extra-parens': ["error", "all", { "conditionalAssign": false }],
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
