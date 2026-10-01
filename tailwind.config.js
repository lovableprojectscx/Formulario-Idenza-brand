/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tinta: {
          DEFAULT: '#0E1420', // Principal dominante (60%)
          surface: '#131B2A', // Superficie de tarjetas
          hover: '#172235',   // Hover en tarjetas
          border: '#1E2C40',  // Bordes sobrios
          borderSubtle: '#182436',
          borderActive: '#2D3E57',
        },
        blanco: {
          DEFAULT: '#F4F2ED', // Blanco hueso editorial (30%)
          pure: '#FFFFFF',
          muted: '#9EACB9',  // Texto secundario legible
          dim: '#627182',    // Captions y placeholders
        },
        ambar: {
          DEFAULT: '#E2A63D', // Acento ámbar (10%) - solo lo que importa
          hover: '#CD922B',
          glow: 'rgba(226, 166, 61, 0.15)',
          subtle: 'rgba(226, 166, 61, 0.08)',
          border: 'rgba(226, 166, 61, 0.35)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
