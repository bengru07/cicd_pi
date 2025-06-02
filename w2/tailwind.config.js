/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/docs/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./theme.config.js",  // Nextra theme config file if you have one
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
