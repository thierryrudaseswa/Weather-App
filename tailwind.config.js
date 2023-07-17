const { max } = require("moment/moment");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: { max: "640px" },
        md2: { max: "1000px" },
        md3:{max : "865px"},
     
        md: { max: "768px" },
        lg2:{max:"1200"},
        lg: { max: "1024px" },
        xl: { max: "1280px" },
      },

      colors: {
        primary: {
          light: "#1c64f2",
          dark: "#1f2937",
        },
      },
    },
  },
  variants: {
    extends: {
      textColor: ["dark"],
    },
  },
  plugins: [],
};
