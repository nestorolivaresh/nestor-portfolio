import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        barlow: ['var(--font-barlow)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
