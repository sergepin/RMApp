/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rick-blue': '#00B5CC',
        'morty-green': '#97CE4C',
        'portal-orange': '#FF6B35'
      }
    },
  },
  plugins: [],
}
