/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          default: "#D9A8A4",
        },
      },
      backgroundImage: {
        "hero-pattern": "url('./src/assets/images/coversen.jpg')",
      },
    },
  },
  plugins: [],
};
