import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      animation: {
        'background-shine': 'background-shine 4s linear infinite',
      },
      keyframes: {
        'background-shine': {
          'from': {
            'background-position': '0 0',
          },
          'to': {
            'background-position': '-200% 0',
          },
        },
      },
    },
  },
  variants: {},
  plugins: [],
  purge: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}

export default config
