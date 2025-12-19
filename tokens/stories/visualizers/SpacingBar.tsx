interface SpacingBarProps {
  /** The spacing value to display */
  value: string;
  /** Optional label for accessibility */
  label?: string;
}

const barClasses = "h-6 min-w-1 max-w-full rounded-sm bg-brand-accent";
const labelClasses = "ml-2 text-page-text-muted text-xs italic";

/**
 * Displays a horizontal bar representing a spacing value
 */
export const SpacingBar = ({ value, label }: SpacingBarProps) => {
  const isNegative = value.startsWith("-");
  const isFluid = value.includes("clamp");
  const isPercentage = value.endsWith("%");

  // Determine what to render
  const getContent = () => {
    if (isNegative) {
      return <span className={labelClasses}>{"negative"}</span>;
    }

    if (isFluid) {
      return (
        <>
          <div className={barClasses} style={{ width: "3rem" }} />
          <span className={labelClasses}>{"fluid"}</span>
        </>
      );
    }

    if (isPercentage) {
      // Cap percentage bars at a reasonable max width
      const percent = Number.parseFloat(value);
      const cappedWidth = Math.min(percent, 100) * 0.8; // 80px max for 100%
      return (
        <div
          className={barClasses}
          style={{ width: `${cappedWidth}px` }}
          title={label || value}
          role="img"
          aria-label={label || `Spacing: ${value}`}
        />
      );
    }

    // Standard dimension value (rem, px, etc.)
    return (
      <div
        className={barClasses}
        style={{ width: value }}
        title={label || value}
        role="img"
        aria-label={label || `Spacing: ${value}`}
      />
    );
  };

  return <div className="flex h-12 min-w-20 items-center">{getContent()}</div>;
};
