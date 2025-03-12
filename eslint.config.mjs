import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from '@stylistic/eslint-plugin-ts';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    languageOptions: { globals: globals.browser },
    rules: {
      '@stylistic/ts/semi': ["error", "always"],  // Garante ponto e vírgula obrigatório
      "no-console": ["error", { allow: ["warn", "error"] }],  // Proíbe console.log(), mas permite console.warn() e console.error()
      "no-shadow": "error"
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];