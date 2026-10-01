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
          DEFAULT: '#0E1420', // Tinta profunda (ADN IDENZA)
          soft: '#1E293B',    // Texto secundario oscuro
          muted: '#64748B',   // Muted / placeholders
          subtle: '#94A3B8',  // Captions suaves
          border: '#E2E8F0',  // Bordes limpios en modo claro
          borderDark: '#CBD5E1',
        },
        blanco: {
          DEFAULT: '#FFFFFF', // Blanco puro
          hueso: '#F8F7F4',   // Blanco hueso editorial (fondo principal)
          card: '#FFFFFF',    // Fondo de tarjetas
          hover: '#F1F5F9',   // Hover suave
          muted: '#F8FAFC',
        },
        ambar: {
          DEFAULT: '#E2A63D', // Ámbar oficial IDENZA
          hover: '#CD922B',
          dark: '#B47B16',
          light: '#FEF3C7',
          subtle: '#FFFDF5',
          border: '#FDE68A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
