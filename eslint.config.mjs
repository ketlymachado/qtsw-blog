import globals from "globals";
import plugins from "eslint/js";
import eslint from "typescript-eslint";
import stylisticTs from '@stylistic/eslint-plugin-ts';
import unusedImports from "eslint-plugin-unused-imports";
import eslintSangs from 'eslint-plugin-sangs';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js,mjs,cjs,ts**"],
    plugins: {
      '@stylistic/ts': stylisticTs,
      'unused-imports': unusedImports,
    },
    languageOptions: { globals: globals.browser },
    rules: {
      '@stylistic/ts/semi': ["error", "always"],  // Garante ponto e vírgula obrigatório
      'no-console': ['error', { allow: ['warn', 'error'] }], // Proíbe console.log(), mas permite console.warn() e console.error()
      'no-shadow': 'error',  // Proíbe declaração de variáveis que sombream variáveis de escopo superior
      '@stylistic/ts/quotes': ["error", "double"],
      '@stylistic/ts/indent': ["error", 2],
      '@stylistic/ts/comma-dangle': ["error", "always-multiline"],
      'typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      'unused-imports/no-unused-imports': 'error',
      'eslint-plugin-sangs': 'error', // Apenas exemplo, ajuste conforme necessário
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
