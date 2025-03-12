import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from '@stylistic/eslint-plugin-ts';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    languageOptions: { globals: globals.browser },
    rules: {
      '@stylistic/ts/semi': ["error", "always"],
      '@stylistic/ts/indent': ["error", "tab"],
      "camelcase": ["error", { "properties": "always" }],
      "no-magic-numbers": ["error", { "ignore": [0, 1, -1], "ignoreArrayIndexes": true }],
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];