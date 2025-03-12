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
      '@stylistic/ts/lines-around-comment': ["error", { "beforeLineComment": true }],
      '@stylistic/ts/no-extra-parens': ["error", "all", { "conditionalAssign": false }],

    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
