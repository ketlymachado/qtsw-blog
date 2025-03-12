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
      'no-empty-function': "off",
      '@typescript-eslint/no-empty-function': "error",
      '@typescript-eslint/no-use-before-define': "error"
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];