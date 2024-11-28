// local custom plugins
const futuraDevEslintTypescript = require("@futura-dev/eslint-config-typescript");

module.exports = [
  ...futuraDevEslintTypescript.config,
  { ignores: ['**.js'] },
  { ignores: ["dist"], rules: { "import/no-unresolved": "off" } },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^_$" }]
    }
  }
];
