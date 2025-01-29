/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },

  // Enable dark mode with class strategy
  darkMode: 'class',  // 'media' for OS-level preference, 'class' for manual control

  plugins: [],
};
