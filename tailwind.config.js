module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 14px 32px rgba(2, 6, 23, 0.38)',
      },
      colors: {
        primary: '#7c9cff',
        accent: '#8ef0c1',
      },
    },
  },
  plugins: [],
};
