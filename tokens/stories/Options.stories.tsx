import preview from "#.storybook/preview";
import { TokenGrid } from "./TokenGrid";
import { byTier, byType } from "./utils";

const meta = preview.meta({
  title: "Design Tokens/Levels/1: Options",
  tags: ["!autodocs", "!dev", "!test"],
  component: TokenGrid,
  parameters: {
    layout: "fullscreen",
  },
});

const optionTokens = byTier("options");

/**
 * Raw design values with no semantic meaning. These are the building blocks.
 *
 * - **Colors**: `--colors-rose-600`, `--colors-gray-500`
 * - **Spacing**: `--spacing-4`, `--spacing-14`
 * - **Typography**: `--typography-fontSize-title-fluid`
 *
 * Options are defined in `tokens/options/` and should rarely be used directly in components.
 */
export const Options = meta.story({
  name: "Options",
  args: {
    tokens: optionTokens,
    title: "Options (Tier 1)",
    groupByCategory: true,
  },
});

/** Every color token across all categories */
export const AllColors = meta.story({
  name: "All Colors",
  args: {
    tokens: byType("color", optionTokens),
    title: "All Colors",
    groupByCategory: true,
  },
});

/** Every spacing, sizing, and dimension token. */
export const AllSpacing = meta.story({
  name: "Spacing & Dimensions",
  args: {
    tokens: byType("dimension", optionTokens),
    title: "All Spacing & Dimensions",
    groupByCategory: true,
  },
});
