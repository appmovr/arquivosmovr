/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090909',
        surface: {
          DEFAULT: '#121212',
          raised: '#1A1A1A',
          line: '#262626',
        },
        lime: {
          DEFAULT: '#B7FF3C',
          dim: '#8FCC2E',
        },
        mute: {
          DEFAULT: '#9A9A9A',
          faint: '#6B6B6B',
        },
      },
      fontFamily: {
        sans: ['"Archivo Variable"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        plate: '6px',
      },
    },
  },
  plugins: [],
}
