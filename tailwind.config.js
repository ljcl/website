const typographyHeadings = {
  fontStyle: 'italic',
  textTransform: 'uppercase',
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
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      sm: ['16px', '22px'],
      base: ['18px', '26px'],
      lg: ['22px', '30px'],
      xl: ['26px', '34px'],
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Inter', 'serif'],
    },
    extend: {
      typography: {
        DEFAULT: typographyBlock,
        lg: typographyBlock,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
