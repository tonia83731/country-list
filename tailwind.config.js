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
        "light-60": "rgb(255, 255, 255, 0.6)",
        "light-bg": "#FAFAFA",
        "light-gray": "#848484",
        "light-text": "#111517",
        dark: "#2B3844",
        "dark-60": "rgb(43, 56, 68, 0.6)",
        "dark-80": "rgb(43, 56, 68, 0.8)",
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
