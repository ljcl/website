/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    fontSize: {
      "display-xl": [
        "var(--typography-fontSize-display-xl)",
        { lineHeight: "0.92", letterSpacing: "-0.01em" },
      ],
      "display-l": [
        "var(--typography-fontSize-display-l)",
        { lineHeight: "0.92", letterSpacing: "-0.01em" },
      ],
      "display-m": [
        "var(--typography-fontSize-display-m)",
        { lineHeight: "0.92", letterSpacing: "-0.01em" },
      ],
      h1: ["var(--typography-fontSize-h1)", { lineHeight: "1.05" }],
      h2: ["var(--typography-fontSize-h2)", { lineHeight: "1.05" }],
      h3: ["var(--typography-fontSize-h3)", { lineHeight: "1.2" }],
      h4: ["var(--typography-fontSize-h4)", { lineHeight: "1.2" }],
      body: ["var(--typography-fontSize-body)", { lineHeight: "1.5" }],
      "body-sm": ["var(--typography-fontSize-body-sm)", { lineHeight: "1.5" }],
      caption: ["var(--typography-fontSize-caption)", { lineHeight: "1.5" }],
      micro: ["var(--typography-fontSize-micro)", { lineHeight: "1.2" }],
      "title-fluid": [
        "var(--typography-fontSize-title-fluid)",
        { lineHeight: "1.1" },
      ],
    },
    extend: {
      colors: {
        // Palette families (only shades actually used by the design)
        void: {
          "000": "var(--colors-void-000)",
          "050": "var(--colors-void-050)",
          100: "var(--colors-void-100)",
          200: "var(--colors-void-200)",
          300: "var(--colors-void-300)",
          400: "var(--colors-void-400)",
        },
        bone: {
          100: "var(--colors-bone-100)",
          200: "var(--colors-bone-200)",
          300: "var(--colors-bone-300)",
          400: "var(--colors-bone-400)",
          500: "var(--colors-bone-500)",
          600: "var(--colors-bone-600)",
          700: "var(--colors-bone-700)",
        },
        blood: {
          100: "var(--colors-blood-100)",
          200: "var(--colors-blood-200)",
          300: "var(--colors-blood-300)",
          400: "var(--colors-blood-400)",
          500: "var(--colors-blood-500)",
          600: "var(--colors-blood-600)",
          700: "var(--colors-blood-700)",
        },
        ember: {
          400: "var(--colors-ember-400)",
          500: "var(--colors-ember-500)",
        },
        // Brand (via decisions)
        "brand-primary": "var(--brand-color-primary)",
        "brand-primary-hover": "var(--brand-color-primary-hover)",
        "brand-accent": "var(--brand-color-accent)",
        // Page surfaces
        "page-bg": "var(--page-bg)",
        "page-bg-elev-1": "var(--page-bg-elev-1)",
        "page-bg-elev-2": "var(--page-bg-elev-2)",
        "page-text-body": "var(--page-text-body)",
        "page-text-heading": "var(--page-text-heading)",
        "page-text-muted": "var(--page-text-muted)",
        "page-text-dim": "var(--page-text-dim)",
        "page-rule": "var(--page-rule)",
        "page-rule-strong": "var(--page-rule-strong)",
        // Code
        "code-bg": "var(--code-bg)",
        "code-text": "var(--code-text)",
        "code-border": "var(--code-border)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
        blackletter: "var(--font-blackletter)",
      },
      letterSpacing: {
        display: "-0.01em",
        caps: "0.18em",
        "caps-tight": "0.08em",
      },
      borderWidth: {
        DEFAULT: "var(--layout-stroke-regular)",
        heavy: "var(--layout-stroke-heavy)",
      },
      borderRadius: {
        none: "0",
        DEFAULT: "0",
        sm: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
      boxShadow: {
        bleed: "0 0 80px -10px rgba(159, 13, 23, 0.35)",
        hairline: "inset 0 0 0 1px var(--page-rule)",
      },
      transitionTimingFunction: {
        ritual: "var(--motion-ease-ritual)",
      },
      transitionDuration: {
        fast: "var(--motion-duration-fast)",
        base: "var(--motion-duration-base)",
        slow: "var(--motion-duration-slow)",
        ritual: "var(--motion-duration-ritual)",
      },
      spacing: {
        "container-padding": "var(--layout-container-padding)",
        section: "var(--layout-section-spacing)",
        gutter: "var(--layout-gutter)",
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
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
