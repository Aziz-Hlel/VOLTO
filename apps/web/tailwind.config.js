// tailwind.config.js
export default {
  plugins: [require("tailwind-scrollbar")],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // for body text
        heading: ["Poppins", "ui-sans-serif", "system-ui"], // optional semantic font
      },
    },
  },
};
