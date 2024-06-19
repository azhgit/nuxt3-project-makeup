/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      screens: {
        'custom-lg': '850px',
      },
      fontFamily: {
        sans: ['Benton Sans Regular', 'sans-serif'],
        bold: ['Benton Sans Bold', 'sans-serif'],
        regular: ['Benton Sans Regular', 'sans-serif'],
      },
      colors: {
        primary: '#00a1f9',
        primaryHover: '#94cbff',
        textColor: '#333333',
        gray: {
          400: '#888888',
        },
      },
    },
  },
  plugins: [],
}
