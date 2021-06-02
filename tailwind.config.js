module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: {
        DEFAULT: '#4A49BE',
        dark: '#232370',
        light: '#9177FF'
      },
      secondary: {
        DEFAULT: '#F2B3A1',
      },
      white: {
        DEFAULT: '#fff'
      },
      black: {
        DEFAULT: '#000'
      },
      gray: {
        DEFAULT: '#A3A3A3',
        "100": "#F0F0F0",
        "400": "#AAA",
        "500": "#777"
      },
      green: {
        DEFAULT: "#5DD362"
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
