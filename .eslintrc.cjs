/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["*.spec.ts", "jest.config.js"],
  root: true,
  rules: {
    "no-console": "off",
    "dot-notation": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "eslint-disable-next-line @typescript-eslint/no-unsafe-argument": "off",
  },
};
