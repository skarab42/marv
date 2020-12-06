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
    borderRadius: {
      none: "0",
      sm: "2px",
      default: "4px",
      md: "8px",
      lg: "16px",
      xl: "42px",
      half: "50%",
      full: "100%",
    },
  },
  variants: {},
  plugins: [],
};
