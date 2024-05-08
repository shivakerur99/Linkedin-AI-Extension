/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom1: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
