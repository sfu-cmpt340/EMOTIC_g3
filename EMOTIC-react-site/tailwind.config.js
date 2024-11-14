/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        nunitoSans: ["Nunito Sans"],
        inter: ["Inter"],
        montserrat: ["Montserrat"],
      },
      colors: { // NOTE: Names coorispond with the theme the browser is in, not with the parity of the color
        lightBackground: {
          500: "#FCFCFC", // Main stage background
          600: "#DBDEE2", // Sidebar background
        },
        darkBackground: {
          500: "#252836", // Main stage and sidebar background
        },
        lightColorHero: { // Blue for hero components in light mode
          500: "#6D86FB",
        },
        darkColorHero: { // Magenta for hero components in dark mode
          500: "#BA51F9",
        },
        textLight: { // Color for text in light mode
          100: "#FFFFFF", // White text on a colored background
          500: "#514F4F", // Hero text
          900: "000000", // Black text on a light background
        },
        darkLight: { // Color for text in dark mode
          100: "000000", // Black text on a colored background
          500: "D8D5D5", // Hero text
          900: "FFFFFF", // White text on a dark background
        },
        lightBorder: { // Color of border in light mode
          500: "#DBDEE2",
        },
        darkBorder: { // Color of border in dark mode
          500: "FCFCFC",
        },
        iconLight: { // Color of icons in light mode
          500: "#363636",
        },
        iconDark: {  // Color of icons in dark mode
          500: "FCFCFC",
        }
      },
    },
  },
  plugins: [],
}

