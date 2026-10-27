import styles from "./TokenGrid.module.css";
import { type Token, TokenRow } from "./TokenRow";

export interface TokenGridProps {
  /** Array of tokens to display */
  tokens: Token[];
  /** Group tokens by category */
  groupByCategory?: boolean;
}

/** Table header component */
const TableHeader = () => (
  <div className={styles.tableHeader}>
    <span className="text-page-text-muted text-xs font-semibold tracking-wide uppercase">
      {"Token and description"}
    </span>
    <span className="text-page-text-muted text-xs font-semibold tracking-wide uppercase">
      {"Light value"}
    </span>
    <span className="text-page-text-muted text-xs font-semibold tracking-wide uppercase">
      {"Dark value"}
    </span>
  </div>
);

/** Token table with header and rows */
const TokenTable = ({ tokens }: { tokens: Token[] }) => (
  <div className="flex flex-col">
    <TableHeader />
    <div className="flex flex-col">
      {tokens.map((token) => (
        <TokenRow key={token.name} token={token} />
      ))}
    </div>
  </div>
);

/**
 * Displays a table of design tokens with optional grouping
 */
export const TokenGrid = ({
  tokens,
  groupByCategory = false,
}: TokenGridProps) => {
  if (groupByCategory) {
    // Group tokens by category
    const grouped = tokens.reduce<Record<string, Token[]>>((acc, token) => {
      const cat = token.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(token);
      return acc;
    }, {});

    return (
      <div className="p-8">
        {Object.entries(grouped).map(([category, categoryTokens]) => (
          <section key={category} className="mb-10">
            <h3 className="text-page-text-heading mb-2 text-lg font-semibold capitalize">
              {category}
            </h3>
            <TokenTable tokens={categoryTokens} />
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="p-8">
      <TokenTable tokens={tokens} />
    </div>
  );
};
