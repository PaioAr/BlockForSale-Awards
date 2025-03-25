// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html",
    "./public/vote.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'bfs-red': {
          DEFAULT: '#e41c1c',
          'dark': '#aa0909',
          'blood': '#d41a1a',
          'burgundy': '#910606',
        },
        'bfs-black': {
          DEFAULT: '#000000',
          'soft': '#191919',
        },
        'bfs-gray': {
          'dark': '#3a3a3a',
          'medium': '#cccccc',
          'light': '#e6e6e6',
        },
        'bfs-white': '#fdf7f1',
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('/images/background.jpg')",
      },
    },
  },
  plugins: [],
}