const typographyHeadings = {
  fontStyle: "italic",
  textTransform: "uppercase",
  fontWeight: "bold",
};

const typographyBlock = {
  css: {
    h1: typographyHeadings,
    h2: typographyHeadings,
    h3: typographyHeadings,
    h4: typographyHeadings,
    h5: typographyHeadings,
    h6: typographyHeadings,
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    fontSize: {
      sm: ["16px", "22px"],
      base: ["18px", "26px"],
      lg: ["22px", "30px"],
      xl: ["26px", "34px"],
    },
    extend: {
      colors: {
        // Brand colors
        "brand-primary": "var(--brand-color-primary)",
        "brand-primary-hover": "var(--brand-color-primary-hover)",
        "brand-accent": "var(--brand-color-accent)",
        "brand-accent-hover": "var(--brand-color-accent-hover)",

        // Page text
        "page-text-body": "var(--page-text-body)",
        "page-text-heading": "var(--page-text-heading)",
        "page-text-muted": "var(--page-text-muted)",
        "page-text-secondary": "var(--page-text-secondary)",

        // Page background
        "page-bg": "var(--page-bg)",

        // Code block colors
        "code-bg": "var(--code-bg)",
        "code-bg-title": "var(--code-bg-title)",
        "code-text": "var(--code-text)",
        "code-text-badge": "var(--code-text-badge)",
        "code-bg-badge": "var(--code-bg-badge)",
        "code-border": "var(--code-border)",
        "code-border-mark": "var(--code-border-mark)",
      },
      spacing: {
        "container-padding": "var(--layout-container-padding)",
        section: "var(--layout-section-spacing)",
      },
      maxWidth: {
        narrow: "var(--layout-container-maxWidth-narrow)",
      },
      fontSize: {
        "title-fluid": [
          "var(--typography-fontSize-title-fluid)",
          { lineHeight: "1.1" },
        ],
      },
      typography: {
        xl: typographyBlock,
        lg: typographyBlock,
      },
      borderColor: {
        "code-border": "var(--code-border)",
      },
      backgroundColor: {
        "code-highlight": "var(--brand-color-primary)",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
