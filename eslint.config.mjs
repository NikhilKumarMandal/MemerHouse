// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
     rules: {
       "no-console": "error",
       "dot-notation":"error"
    }
  },
  {
    ignores: ["node_modules", "dist/**", "**/.*", "src/tests/**"],
  },
   
  eslintConfigPrettier
);