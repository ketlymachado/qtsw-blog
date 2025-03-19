import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from '@stylistic/eslint-plugin-ts';


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
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];