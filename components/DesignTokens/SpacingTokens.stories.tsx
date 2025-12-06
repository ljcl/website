import preview from "#.storybook/preview";
import tokensMetadata from "../../generated/tokens/tokens-metadata.json";
import { SpacingTokens } from "./SpacingTokens";

const meta = preview.meta({
  component: SpacingTokens,
  parameters: {
    layout: "fullscreen",
  },
});

type TokenValue = string | { [key: string]: TokenValue };

/** Extract spacing tokens from metadata */
function extractTokens(
  obj: Record<string, TokenValue>,
  prefix = "",
): Array<{ name: string; value: string; comment?: string }> {
  const tokens: Array<{ name: string; value: string; comment?: string }> = [];

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}-${key}` : key;

    if (typeof value === "string") {
      tokens.push({
        name: `--${path}`,
        value: value as string,
      });
    } else if (typeof value === "object" && value !== null) {
      tokens.push(...extractTokens(value, path));
    }
  }

  return tokens;
}

const spacingTokens = extractTokens(tokensMetadata.spacing);

/** Spacing scale tokens */
export const SpacingScale = meta.story({
  args: {
    title: "Spacing Scale",
    tokens: spacingTokens,
  },
});
