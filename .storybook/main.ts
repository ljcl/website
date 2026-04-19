import { defineMain } from "@storybook/nextjs-vite/node";

export default defineMain({
  viteFinal: (config) => ({
    ...config,
    optimizeDeps: {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include ?? [])],
    },
  }),
  stories: [
    {
      directory: "../tokens/stories",
    },
    {
      titlePrefix: "Components",
      directory: "../components",
    },
    {
      titlePrefix: "App",
      directory: "../app",
    },
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-mcp",
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
