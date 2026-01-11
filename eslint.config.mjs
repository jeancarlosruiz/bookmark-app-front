import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      ".playwright-mcp/**",
      "dist/**",
      "coverage/**",
      "lib/db/migrations/**",
    ],
  },
];

export default eslintConfig;
