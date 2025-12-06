import type React from "react";
import styles from "./ColorTokens.module.css";

interface ColorToken {
  name: string;
  value: string;
  comment?: string;
}

export interface ColorTokensProps {
  /** Array of color tokens to display */
  tokens: ColorToken[];
  /** Optional title for the token group */
  title?: string;
}

/**
 * ColorTokens component displays a grid of color tokens with swatches and values.
 * Used in Storybook to document the design system's color palette.
 */
export const ColorTokens: React.FC<ColorTokensProps> = ({ tokens, title }) => (
  <div className={styles.container}>
    {title && <h2 className={styles.title}>{title}</h2>}
    <div className={styles.grid}>
      {tokens.map((token) => (
        <div key={token.name} className={styles.token}>
          <div
            className={styles.swatch}
            style={{ backgroundColor: token.value }}
            title={token.value}
          />
          <div className={styles.info}>
            <code className={styles.name}>{token.name}</code>
            <div className={styles.value}>{token.value}</div>
            {token.comment && (
              <div className={styles.comment}>{token.comment}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
