/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-background": "#191A23",
        "dark-foreground": "#EEEFFC",
        "dark-accent-1": "#2C2D41",
        "dark-accent-2": "#20232E",
        "light-background": "#E6E6E6",
        "light-foreground": "#1A1A1A",
      },
    },
  },
  plugins: [],
};
