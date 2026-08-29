/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: '#18191C',
          850: '#222327',
          800: '#2E3035',
          700: '#3D3E44',
          600: '#4D4E56',
        },
        stage: '#E9EBEF',
        mascot: {
          pinkDark: '#F05272',
          pinkMouth: '#7A182F',
          pinkBig: '#FFA7C4',
          pinkBigMouth: '#9F3F62',
          teal: '#63D1D9',
          tealDark: '#1C6D77',
          tealLegs: '#54C2CB',
          blue: '#2B83F6',
          blueDark: '#0E55B3',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out 2s infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
