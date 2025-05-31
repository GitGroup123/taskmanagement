const js = require("@eslint/js");
const globals = require("globals");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs",
      ecmaVersion: "latest"
    },
    extends: ["js/recommended"]
  }
]);