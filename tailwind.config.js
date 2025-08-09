const typographyHeadings = {
  fontStyle: 'italic',
  textTransform: 'uppercase',
  fontWeight: 'bold',
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
    './app/**/*.{js,ts,jsx,tsx}',
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
    extend: {
      typography: {
        xl: typographyBlock,
        lg: typographyBlock,
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
