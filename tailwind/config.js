const colors = require("./colors");

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    enabled: process.argv.includes("--prod"),
    content: ["front-src/**/*.svelte", "front-src/**/*.js"],
    options: {
      whitelistPatterns: [/^rounded-/],
    },
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
