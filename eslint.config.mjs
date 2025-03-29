import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import playwright from "eslint-plugin-playwright";

export default [
  js.configs.recommended, // ESLint base rules
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "playwright": playwright,
    },
    rules: {
      ...tseslint.configs["eslint-recommended"].rules,
      ...tseslint.configs.recommended.rules,
      ...playwright.configs["playwright-test"].rules,
    },
  },
];
