import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from '@stylistic/eslint-plugin-ts';
import sonarjs from 'eslint-plugin-sonarjs';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
    },
    languageOptions: { globals: globals.browser },
    rules: {
      '@stylistic/ts/semi': ["error", "always"],
      '@stylistic/ts/indent': ["error", "tab"],
      "camelcase": ["error", { "properties": "always" }],
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]