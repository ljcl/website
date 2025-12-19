import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import addonVitest from "@storybook/addon-vitest";
import { definePreview } from "@storybook/nextjs-vite";
import { themes } from "storybook/theming";
import "../app/global.css";

export default definePreview({
  tags: ["autodocs"],
  addons: [addonDocs(), addonA11y(), addonVitest()],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "error",
    },
    docs: {
      theme: themes.normal,
      toc: {
        // headingSelector: "h2, h3",
      },
    },
  },
});
