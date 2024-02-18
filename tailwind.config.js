/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Raleway"', "sans-serif"],
    },
    extend: {
      colors: {
        backgroundColor: "#f8fafc",
        buttonPrimary: "#0d0c4d",
        buttonDanger: "#b02a2a",
        footer: "#1e1d73",
        header: "#0d0c4d",
        borderColor: "#9ca3af",
        textPrimary: "#0d0c4d",
        textSecondary: "#ffffff",
      },
    },
  },
  plugins: [],
};
