/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.html", "./assets/js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Family", "inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/forms"),
  ],
};
