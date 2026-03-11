/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'checkpoint-bg': '#0a0a0a',
        'checkpoint-panel': '#050a1f',
        'checkpoint-border': '#1f2a3c',
        'checkpoint-accent': '#2dd4ff',
        'checkpoint-accent-soft': '#38bdf8',
        'checkpoint-purple': '#7c3aed',
        'checkpoint-red': '#f97373',
        'discord-green': '#23a559',
        'cyber-green': '#00ff88',
      },
      fontFamily: {
        sans: ['system-ui', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 40px rgba(34, 211, 238, 0.35)',
        'glow-green': '0 0 60px rgba(35, 165, 89, 0.5), inset 0 0 40px rgba(35, 165, 89, 0.1)',
        'glow-green-neon': '0 0 80px rgba(0, 255, 136, 0.6), inset 0 0 60px rgba(0, 255, 136, 0.15)',
        'inner-soft': 'inset 0 0 40px rgba(15, 23, 42, 0.85)',
      },
      borderRadius: {
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
}
