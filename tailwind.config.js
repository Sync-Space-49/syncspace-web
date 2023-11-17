/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light' : '#fafafa',
        'dark' : '#253646',
        'test' : '#576573',
        'primary' : '#80e08b',
        'secondary' : '#df6236',
        'tertiary' : '#1552a2',
        'blue' : '#49668c',
        'black' : '#0e151b',
        'landing' : '#e6f0fc',
        'success' : '#53a653',
        'info' : '#94aac7',
        'danger' : '#c72337'
      }
    },
  },
  plugins: [],
}

