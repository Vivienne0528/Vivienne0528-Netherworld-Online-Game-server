const js = require("@eslint/js");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const prettier = require("eslint-config-prettier");
const { defineConfig, globalIgnores } = require("eslint/config");

module.exports = defineConfig([
  // 全局忽略
  globalIgnores(["node_modules", "dist"]),

  // Node / JS 文件
  {
    files: ["**/*.js"],
    languageOptions: {
      parser: tsParser, // 可以用 tsParser 支持 JS/TS
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-constant-binary-expression": "off",
    },
  },

  // TypeScript 文件
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    extends: [js.configs.recommended, prettier],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
]);
