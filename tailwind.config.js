/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "blue-bg": "#000080",
        "gradient-blue-start": "#2100ED",
        "gradient-blue-end": "#B0A6F2",
        "gray-bg": "#D9D9D9",
      },
      fontFamily: {
        "press-start": ['"Press Start 2P"', "sans"],
      },
      spacing: {
        "10vh": "10vh",
        "20vh": "20vh",
        "65vh": "65vh",
      },
    },
  },
  plugins: [],
};
