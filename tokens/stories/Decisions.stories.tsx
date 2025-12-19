import {
  Description,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks";
import preview from "#.storybook/preview";
import { TokenGrid } from "./TokenGrid";
import { byCategory, byTier } from "./utils";

const meta = preview.meta({
  title: "Design Tokens/Levels/2: Decisions",
  tags: ["!autodocs", "!dev", "!test"],
  component: TokenGrid,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories />
        </>
      ),
    },
  },
});

const decisionTokens = byTier("decisions");

/**
 * Purpose-based tokens that reference Options. These encode design intent and are what you should use in components.
 *
 * - **Brand**: `--brand-color-primary`, `--brand-color-accent`
 * - **Page**: `--page-text-body`, `--page-bg`
 * - **Code**: `--code-bg`, `--code-border`
 * - **Layout**: `--layout-container-padding`
 *
 * Decisions are defined in `tokens/decisions/` and include `default/inverse` variants for automatic dark mode support.
 */
export const Decisions = meta.story({
  name: "Decisions",
  args: {
    tokens: decisionTokens,
    title: "Decisions (Tier 2)",
    groupByCategory: true,
  },
});

/** The primary brand palette for interactive elements, links, and accents. */
export const BrandColors = meta.story({
  name: "Brand Colors",
  args: {
    tokens: byCategory("brand-color", decisionTokens),
    title: "Brand Colors",
  },
});

/** Document-level tokens for text and backgrounds. */
export const PageTokens = meta.story({
  name: "Page",
  args: {
    tokens: byCategory("page", decisionTokens),
    title: "Page Tokens",
  },
});

/** Styling for code blocks, syntax highlighting, and badges. */
export const CodeTokens = meta.story({
  name: "Code",
  args: {
    tokens: byCategory("code", decisionTokens),
    title: "Code Tokens",
  },
});

/** Spacing and container sizing decisions. */
export const LayoutTokens = meta.story({
  name: "Layout",
  args: {
    tokens: [
      ...byCategory("layout", decisionTokens),
      ...byCategory("layout-options", decisionTokens),
    ],
    title: "Layout Tokens",
  },
});
