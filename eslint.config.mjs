import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "dist/",
      "node_modules/",
      ".github/",
      ".astro/",
      "public/",
      "src/env.d.ts",
      "**/*.d.ts",
      "src/pages/\\[...alias\\].astro",
    ],
  },

  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,

  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    rules: {
      "prefer-rest-params": "error",
      "no-var": "error",
    },
  },
];
