import type React from "react";
import styles from "./SpacingTokens.module.css";

interface SpacingToken {
  name: string;
  value: string;
  comment?: string;
}

export interface SpacingTokensProps {
  /** Array of spacing tokens to display */
  tokens: SpacingToken[];
  /** Optional title for the token group */
  title?: string;
}

/**
 * SpacingTokens component displays spacing values with visual representations.
 * Used in Storybook to document the design system's spacing scale.
 */
export const SpacingTokens: React.FC<SpacingTokensProps> = ({
  tokens,
  title,
}) => (
  <div className={styles.container}>
    {title && <h2 className={styles.title}>{title}</h2>}
    <div className={styles.list}>
      {tokens.map((token) => (
        <div key={token.name} className={styles.token}>
          <div className={styles.info}>
            <code className={styles.name}>{token.name}</code>
            <div className={styles.value}>{token.value}</div>
            {token.comment && (
              <div className={styles.comment}>{token.comment}</div>
            )}
          </div>
          <div className={styles.visualContainer}>
            <div
              className={styles.visual}
              style={{
                width: token.value.startsWith("-") ? undefined : token.value,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
