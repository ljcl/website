interface TypographyPreviewProps {
  /** The font-size value to preview */
  value: string;
  /** Optional label for accessibility */
  label?: string;
}

/**
 * Displays a typography preview showing "Aa" at the specified font size
 */
export const TypographyPreview = ({ value, label }: TypographyPreviewProps) => {
  // For fluid/clamp values, use a reasonable preview size
  const isFluid = value.includes("clamp");
  const previewSize = isFluid ? "1.5rem" : value;

  return (
    <div
      className="flex h-12 min-w-20 items-center overflow-hidden"
      title={label || value}
      role="img"
      aria-label={label || `Typography: ${value}`}
    >
      <span
        className="font-semibold text-page-text-body leading-none"
        style={{ fontSize: previewSize }}
      >
        {"Aa"}
      </span>
    </div>
  );
};
