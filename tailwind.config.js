/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0E1827', // Color primario ya definido
        secondary: '#8FA4B8', // Nuevo color secundario
      },
      borderWidth: {
        '1': '1px', // Nuevo tamaño de borde
      },
      spacing: {
        '30': '7.5rem', // Tamaño de padding/margin 30
        '33': '8.25rem', // Nuevo tamaño de padding/margin 33
        '34': '8.5rem', // Nuevo tamaño de padding/margin 34
      },
    },
  },
  plugins: [],
}