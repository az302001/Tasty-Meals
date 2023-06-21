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
      sm: "640px",
      md: "768px",
      lg: "1024px",
      sm: "	640px",
      md: "768px",
    },
    extend: {
      backgroundImage: {
        tasty: "url('/assets/background.jpg')", // Corregir la ruta de la imagen aquí
      },
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
        manrope: ["Manrope", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        josefin: ["Josefin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
