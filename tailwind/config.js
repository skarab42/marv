const purge = process.argv.includes("--prod");

module.exports = {
  purge: {
    enabled: purge,
    content: ["app/client/**/*.html", "app/client/**/*.js"]
  },
  theme: {},
  variants: {},
  plugins: []
};
