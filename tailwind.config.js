/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "nunito-sans": ["Nunito Sans"],
      },
      colors: {
        light: "#FFFFFF",
        "light-bg": "#FAFAFA",
        "light-gray": "#848484",
        "light-text": "#111517",
        dark: "#2B3844",
        "dark-bg": "#202C36",
        "dark-gray": "#808080",
      },
      screens: {
        xs: "500px",
        900: "900px",
      },
    },
  },
  plugins: [],
};
