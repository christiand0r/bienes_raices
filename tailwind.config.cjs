/** @type {import('tailwindcss').Config} */
const { customVariants } = require("./plugins/tailwind.cjs");

module.exports = {
  content: [
    "./includes/**.pug",
    "./layouts/**.pug",
    "./mixins/**.pug",
    "./templates/*/**.pug",
    "./views/*.pug",
    "./views/*/**.pug",
    "./src/*/**.js",
  ],
  theme: {
    extend: {
      data: {
        public: 'published~="public"',
      },
      screens: {
        xs: "480px",
      },
      transitionProperty: {
        dimension: "height, padding",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [customVariants],
};
