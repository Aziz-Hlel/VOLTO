// eslint.config.js (ESLint flat config)
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import airbnb from "eslint-config-airbnb";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  airbnb,
  prettier, // must come last to disable conflicting rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // Example: you can tweak a few Airbnb rules if too strict
      "react/react-in-jsx-scope": "off", // not needed for React 17+
      "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
      "import/extensions": "off", // TS handles it
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "prettier/prettier": "error", // show Prettier issues as ESLint errors
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {}, // this makes eslint-plugin-import work with TS
      },
    },
  },
];
