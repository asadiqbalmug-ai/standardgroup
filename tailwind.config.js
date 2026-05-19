/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#070707',
          dark: '#111111',
          cream: '#F9F6F0',
          gold: '#A58B62',
          muted: '#6B655E',
          light: '#E9E6E1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        onest: ['Onest', 'system-ui', 'sans-serif'],
        alfa: ['"Alfa Slab One"', 'serif'],
        major: ['Major Mono Display', 'monospace'],
        archivo: ['Archivo Black', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
