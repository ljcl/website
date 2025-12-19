import styles from "./TokenRow.module.css";
import { ColorSwatch, SpacingBar, TypographyPreview } from "./visualizers";

export interface Token {
  name: string;
  path: string[];
  value: string;
  original: string;
  type: string;
  comment: string | null;
  tier: "options" | "decisions";
  category: string;
  inverseValue: string | null;
  inverseOriginal: string | null;
}

interface TokenRowProps {
  token: Token;
}

/**
 * Displays a single token as a table row with token info, light value, and dark value columns
 */
export const TokenRow = ({ token }: TokenRowProps) => {
  const isReference = token.original.startsWith("{");
  const isColor = token.type === "color";
  const isTypography = token.category === "typography";
  const isDimension = token.type === "dimension" && !isTypography;

  const renderVisualizer = (value: string) => {
    if (isColor) return <ColorSwatch value={value} />;
    if (isTypography) return <TypographyPreview value={value} />;
    if (isDimension) return <SpacingBar value={value} />;
    return null;
  };

  return (
    <div className={styles.row}>
      {/* Column 1: Token name and description */}
      <div className="flex flex-col gap-1">
        <code className={styles.name}>{token.name}</code>
        {token.comment && (
          <p className="mt-1 text-page-text-secondary text-sm leading-snug">
            {token.comment}
          </p>
        )}
      </div>

      {/* Column 2: Light value */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {renderVisualizer(token.value)}
          <div className="flex flex-col text-[0.8125rem] text-page-text-secondary">
            <code>{token.value}</code>
            {isReference && (
              <code className="mt-1 flex items-center gap-1 text-brand-accent text-xs">
                {token.original}
              </code>
            )}
          </div>
        </div>
      </div>

      {/* Column 3: Dark value */}
      <div className="flex flex-col gap-2">
        {token.inverseValue ? (
          <div className="flex items-center gap-3">
            {renderVisualizer(token.inverseValue)}
            <div className="flex flex-col text-[0.8125rem] text-page-text-secondary">
              <code>{token.inverseValue}</code>
              {isReference && (
                <code className="mt-1 flex items-center gap-1 text-brand-accent text-xs">
                  {token.inverseOriginal}
                </code>
              )}
            </div>
          </div>
        ) : (
          <span className="text-page-text-muted text-xs italic">{"—"}</span>
        )}
      </div>
    </div>
  );
};
