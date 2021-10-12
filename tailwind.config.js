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

module.exports = {
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
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "text-primary": "var(--color-text-primary)",
        "text-heading": "var(--color-text-heading)",
        "text-muted": "var(--color-text-muted)",
        "text-secondary": "var(--color-text-secondary)",
        "bg-page": "var(--color-bg-page)",
      },
      spacing: {
        "container-padding": "var(--container-padding)",
        section: "var(--section-spacing)",
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
