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
        sg: {
          cream: '#F5F0E8',
          dark: '#1A1A18',
          navy: '#1E2D40',
          gold: '#C9A96E',
          charcoal: '#2D2D2D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
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
