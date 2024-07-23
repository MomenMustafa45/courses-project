/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          default: "#D9A8A4",
        },
      },
      backgroundImage: {
        "hero-pattern": "url('./src/assets/images/coversen.jpg')",
        "hero-pattern-small": "url('./src/assets/images/coverSection.png')",
      },
    },
  },
  plugins: [],
};
