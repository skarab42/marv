const darkMode = require("tailwindcss-dark-mode");
const defaultConfig = require("tailwindcss/defaultConfig");
const { colors } = require("tailwindcss/defaultTheme");

const purge = process.argv.includes("--prod");

const { variants } = defaultConfig;

const darkVariants = [
  "hover",
  "focus",
  "active",
  "disabled",
  "group-hover",
  "focus-within",
  "even",
  "odd",
  "placeholder"
];

function mergeDarkVariantes(key) {
  const input = variants[key];
  const output = [...input, "dark"];
  input.forEach(variant => {
    if (darkVariants.includes(variant)) {
      output.push(`dark-${variant}`);
    }
  });
  return output;
}

module.exports = {
  purge: {
    enabled: purge,
    content: [
      "app/renderer/**/*.html",
      "app/renderer/**/*.svelte",
      "app/main/bridges/titlebar.js"
    ],
    options: {
      whitelist: ["theme--dark"]
    }
  },
  theme: {
    darkSelector: ".theme--dark",
    extend: {
      colors: {
        primary: {
          light: colors.purple["500"],
          lighter: colors.purple["600"],
          default: colors.purple["700"],
          darker: colors.purple["800"],
          dark: colors.purple["900"]
        },
        secondary: {
          light: colors.gray["300"],
          lighter: colors.gray["400"],
          default: colors.gray["500"],
          darker: colors.gray["600"],
          dark: colors.gray["700"]
        },
        light: {
          lighter: colors.gray["200"],
          default: colors.gray["300"],
          darker: colors.gray["400"]
        },
        dark: {
          lighter: colors.gray["700"],
          default: colors.gray["800"],
          darker: colors.gray["900"]
        }
      }
    },
    minWidth: {
      "0": "0%",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%"
    }
  },
  variants: {
    textColor: mergeDarkVariantes("textColor"),
    borderColor: mergeDarkVariantes("borderColor"),
    backgroundColor: ["even", ...mergeDarkVariantes("backgroundColor")]
  },
  plugins: [darkMode()]
};
