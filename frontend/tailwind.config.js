/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        'primary-500': '#50ba74',
        'primary-600': '#47a562',
        'primary-700': '#3d995c',
      },
    },
  },
  plugins: [],
}

