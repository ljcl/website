import { defineMain } from "@storybook/nextjs-vite/node";

export default defineMain({
  stories: ["../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  features: {
    experimentalRSC: true,
    experimentalTestSyntax: true,
  },
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  docs: {
    defaultName: "Documentation",
  },
});
