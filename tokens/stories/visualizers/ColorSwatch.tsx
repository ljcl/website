interface ColorSwatchProps {
  /** The color value to display */
  value: string;
  /** Optional label for accessibility */
  label?: string;
}

/**
 * Displays a color swatch preview
 */
export const ColorSwatch = ({ value, label }: ColorSwatchProps) => (
  <div
    className="h-12 w-12 shrink-0 rounded border border-black/10 dark:border-white/10"
    style={{ backgroundColor: value }}
    title={label || value}
    role="img"
    aria-label={label || `Color: ${value}`}
  />
);
