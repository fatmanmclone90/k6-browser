import pluginJs from "@eslint/js";
import globals from "globals";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        console: 'readonly',
        __VU: 'readonly',
        __ENV: 'readonly',
        __ITER: 'readonly',
        open: 'readonly',
      }
    },
    rules: {
      'import/no-unresolved': 0,
      'no-restricted-globals': 0,
      'import/extensions': 0,
      'no-prototype-builtins': 0,
      'semi': 1
    },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended
];