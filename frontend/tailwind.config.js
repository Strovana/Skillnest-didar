/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Cabinet Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        nest: {
          50: '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          900: '#431407'
        },
        ink: {
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a24',
          600: '#252535',
          500: '#3a3a50',
          400: '#6b6b8a',
          300: '#9898b8',
          200: '#c5c5d8',
          100: '#e8e8f0'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")"
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'slide-in': 'slideIn 0.4s ease forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-10px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        }
      }
    }
  },
  plugins: []
}
