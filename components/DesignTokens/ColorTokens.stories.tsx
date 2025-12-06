import preview from "#.storybook/preview";
import tokensMetadata from "../../generated/tokens/tokens-metadata.json";
import { ColorTokens } from "./ColorTokens";

const meta = preview.meta({
  component: ColorTokens,
  parameters: {
    layout: "fullscreen",
  },
});

type TokenValue = string | { [key: string]: TokenValue };

/** Extract color tokens from metadata */
function extractColorTokens(
  obj: Record<string, TokenValue>,
  prefix = "",
): Array<{ name: string; value: string; comment?: string }> {
  const tokens: Array<{ name: string; value: string; comment?: string }> = [];

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}-${key}` : key;

    if (typeof value === "string") {
      // This is a token value
      tokens.push({
        name: `--${path}`,
        value: value as string,
      });
    } else if (typeof value === "object" && value !== null) {
      // Recurse into nested objects
      tokens.push(...extractColorTokens(value, path));
    }
  }

  return tokens;
}

const primitiveColors = extractColorTokens(tokensMetadata.colors);
const brandColors = extractColorTokens(
  tokensMetadata["brand-color"] || {},
  "brand-color",
);
const contentColors = extractColorTokens(
  tokensMetadata.content || {},
  "content",
);

/** Primitive color palette */
export const PrimitiveColors = meta.story({
  args: {
    title: "Primitive Colors",
    tokens: primitiveColors,
  },
});

/** Brand color tokens (Tier 2 decisions) */
export const BrandColors = meta.story({
  args: {
    title: "Brand Colors",
    tokens: brandColors,
  },
});

/** Content color tokens (Tier 2 decisions) */
export const ContentColors = meta.story({
  args: {
    title: "Content Colors",
    tokens: contentColors,
  },
});
