import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import addonVitest from "@storybook/addon-vitest";
import { definePreview } from "@storybook/nextjs-vite";
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Pirata_One,
  Space_Grotesk,
} from "next/font/google";
import { themes } from "storybook/theming";
import "../app/global.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const blackletter = Pirata_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-blackletter",
  display: "swap",
});

const fontClassName = `${display.variable} ${sans.variable} ${mono.variable} ${blackletter.variable}`;

export default definePreview({
  tags: ["autodocs"],
  addons: [addonDocs(), addonA11y(), addonVitest()],
  decorators: [
    (Story) => (
      <div className={fontClassName}>
        <Story />
      </div>
    ),
  ],
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
