/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1600px',
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-ibm-plex-arabic)", "var(--font-tajawal)", "'IBM Plex Sans Arabic'", "'Tajawal'", "'IBM Plex Sans'", 'sans-serif'],
        tajawal: ["var(--font-tajawal)", "var(--font-ibm-plex-arabic)", 'sans-serif'],
      },
      colors: {
        charcoal: {
          DEFAULT: '#0f0f0f',
          mid: '#1a1a1a',
          light: '#242424',
        },
        gold: {
          DEFAULT: '#B8860B',
          deep: '#8B6914',
          bright: '#D4A017',
          shimmer: '#F0C040',
        },
        cream: {
          DEFAULT: '#F5F5DC',
        },
      },
    },
  },
  plugins: [],
};
