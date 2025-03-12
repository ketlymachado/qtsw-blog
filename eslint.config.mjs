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
<<<<<<< Updated upstream
=======
      "@stylistic/ts/quotes": ["error", "double"],
      "@stylistic/ts/indent": ["error", 2],
      "@stylistic/ts/comma-dangle": ["error", "always-multiline"],
      "@eslint no-shadow": ["error", { "hoist": "functions" }]

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];