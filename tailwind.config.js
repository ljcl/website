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
        accent: "var(--brand-color-primary)",
        "accent-hover": "var(--brand-color-primary-hover)",
        "text-primary": "var(--content-text-body)",
        "text-heading": "var(--content-text-heading)",
        "text-muted": "var(--content-text-muted)",
        "text-secondary": "var(--content-text-secondary)",
        "bg-page": "var(--content-bg-page)",
      },
      spacing: {
        "container-padding": "var(--layout-container-padding)",
        section: "var(--layout-section-spacing)",
      },
      typography: {
        xl: typographyBlock,
        lg: typographyBlock,
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
