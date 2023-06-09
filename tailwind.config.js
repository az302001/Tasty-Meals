/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      lg: "1024px",
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        color1: "#4D455D",
        color2: "#E96479",
        color3: "#F5E9CF",
        color4: "#7DB9B6",
      },
      fontFamily: {
        pacifico: ["Pacifico"],
        manrope: ["Manrope"],
        josefin: ["Josefin"],
      },
    },
  },
  plugins: [],
};
