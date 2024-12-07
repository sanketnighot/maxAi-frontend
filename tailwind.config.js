/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        background: 'var(--color-background)',
        card: 'var(--color-card)',
        impact: {
          high: 'var(--color-impact-high)',
          medium: 'var(--color-impact-medium)',
          low: 'var(--color-impact-low)',
        },
      },
      animation: {
        'theme-toggle': 'theme-toggle 0.5s ease-in-out',
      },
      keyframes: {
        'theme-toggle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};