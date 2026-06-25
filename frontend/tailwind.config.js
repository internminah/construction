/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#065F46',
          light: '#047857',
          dark: '#022c22',
        },
        secondary: {
          DEFAULT: '#047857',
          light: '#059669',
          dark: '#064e3b',
        },
        accent: {
          DEFAULT: '#10B981',
          light: '#34d399',
          dark: '#059669',
        },
        mint: {
          DEFAULT: '#ECFDF5',
          light: '#F0FDF4',
          dark: '#D1FAE5',
        },
        slate: {
          DEFAULT: '#1F2937',
          light: '#4B5563',
          dark: '#111827',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
