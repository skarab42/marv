const colors = require("./colors");

const purge = process.argv.includes("--prod");

module.exports = {
  purge: {
    enabled: purge,
    content: ["app/client/**/*.html", "app/client/**/*.js"],
  },
  theme: {
    extend: {
      colors,
    },
  },
  variants: {},
  plugins: [],
};
