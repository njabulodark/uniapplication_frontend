/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind
        surface: {
          DEFAULT: 'var(--surface-default)',
          elevated: 'var(--surface-elevated)',
          glass: 'var(--surface-glass)',
        },
        border: {
          subtle: 'var(--border-subtle)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          'primary-dark': 'var(--text-primary-dark)',
          'secondary-dark': 'var(--text-secondary-dark)',
        }
      },
      boxShadow: {
        'premium': 'var(--shadow-xl)',
        'glow': 'var(--shadow-glow)',
      },
      animation: {
        blob: 'blob 8s infinite cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -10px) scale(1.05)' },
          '50%': { transform: 'translate(10px, 20px) scale(0.95)' },
          '75%': { transform: 'translate(-15px, 10px) scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}