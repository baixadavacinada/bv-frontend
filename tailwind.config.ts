import type { Config } from 'tailwindcss'

const config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [],
} satisfies Config

export default config
