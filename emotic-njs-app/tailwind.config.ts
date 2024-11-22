import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunitoSans: ["Nunito Sans"],
        inter: ["Inter"],
        montserrat: ["Montserrat"],
      },
      colors: { // NOTE: Names correspond with the theme the browser is in, not with the parity of the color
        lightBackground: {
          500: "#FCFCFC", // Main stage background
          600: "#DBDEE2", // Sidebar background
        },
        darkBackground: {
          300: "#303443", // Drag and drop background
          500: "#252836", // Main stage and sidebar background
        },
        lightColorHero: { // Blue for hero components in light mode
          500: "#6D86FB",
        },
        darkColorHero: { // Magenta for hero components in dark mode
          500: "#BA51F9",
        },
        lightText: { // Color for text in light mode
          100: "#FFFFFF", // White text on a colored background
          500: "#514F4F", // Hero text
          900: "#000000", // Black text on a light background
        },
        darkText: { // Color for text in dark mode
          100: "#000000", // Black text on a colored background
          500: "#D8D5D5", // Hero text
          900: "#FFFFFF", // White text on a dark background
        },
        lightBorder: { // Color of border in light mode
          500: "#DBDEE2",
        },
        darkBorder: { // Color of border in dark mode
          500: "#FCFCFC",
        },
        iconLight: { // Color of icons in light mode
          500: "#363636",
        },
        iconDark: {  // Color of icons in dark mode
          500: "#FCFCFC",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
