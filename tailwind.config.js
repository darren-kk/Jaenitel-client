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
        "dung-guen-mo": ['"DungGeunMo"', "sans"],
      },
      spacing: {
        "10vh": "10vh",
        "15vh": "15vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "35vh": "35vh",
        "40vh": "40vh",
        "55vh": "55vh",
        "60vh": "60vh",
        "65vh": "65vh",
        "70vh": "70vh",
        "75vh": "75vh",
        "80vh": "80vh",
      },
      keyframes: {
        typewriter: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "black" },
        },
        drawFromTop: {
          "0%": { opacity: "100", clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)" },
          "25%": { clipPath: "polygon(0 0, 100% 0, 100% 25%, 0 25%)" },
          "50%": { clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" },
          "75%": { clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 75%)" },
          "100%": { opacity: "100", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        },
      },
      animation: {
        typewriter: "typewriter 5s steps(70, end) forwards, blink .75s step-end infinite",
        slideFadeIn: "drawFromTop 2s steps(4) forwards",
        slideFadeInImage: "drawFromTop 4s steps(4) forwards",
        slideFadeInVideo: "drawFromTop 6s steps(4) forwards",
      },
    },
  },
  plugins: [],
};
