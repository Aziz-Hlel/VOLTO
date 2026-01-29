// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
        garamond: ["'EB Garamond'", "serif"],
        cinzel: ["Cinzel", "serif"],
      },
    },
  },

  plugins: [require("tailwind-scrollbar")],
};
