const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "c-powder-blue": "#9fc4f8",
        "c-dark-blue": "#2b7bcd",
        "c-cyan": "#03fcfc",
        "c-yellow": "#efd47d",
        "c-green": "#31b53b",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
