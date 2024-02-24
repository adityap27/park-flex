/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Raleway"', "sans-serif"],
    },
    extend: {
      colors: {
        backgroundColor: "#f8fafc",
        buttonPrimary: "#0d0c4d",
        buttonDanger: "#b02a2a",
        footer: "#0d0c4d",
        header: "#0d0c4d",
        borderColor: "#9ca3af",
        textPrimary: "#0d0c4d",
        textSecondary: "#ffffff",
      },
    },
  },
  plugins: [],
  important: true,
};
