import tokenData from "../../generated/tokens/tokens-for-storybook.json";
import { type Token } from "./TokenRow";

// Type assertion for imported JSON
export const tokens = tokenData.tokens as Token[];

// Filter helpers
export const byTier = (tier: Token["tier"], filteredTokens: Token[] = tokens) =>
  filteredTokens.filter((t) => t.tier === tier);
export const byCategory = (
  category: string,
  filteredTokens: Token[] = tokens,
) => filteredTokens.filter((t) => t.category === category);
export const byType = (type: string, filteredTokens: Token[] = tokens) =>
  filteredTokens.filter((t) => t.type === type);
