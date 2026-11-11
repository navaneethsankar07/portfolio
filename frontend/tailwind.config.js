/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'electric-cyan': '#00F0FF',
        'electric-blue': '#00AAFF',
        'electric-emerald': '#10B981',
        obsidian: {
          950: '#030305',
          900: '#07080B',
          850: '#0C0D12',
          800: '#12141B',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['Geist Mono', 'Space Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        widest: '0.22em',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
