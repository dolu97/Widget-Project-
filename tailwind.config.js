module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7c9cff',
        accent: '#8ef0c1',
        ink: '#0b1120',
      },
      boxShadow: {
        soft: '0 12px 30px rgba(15, 23, 42, 0.28)',
      },
    },
  },
  plugins: [],
};
