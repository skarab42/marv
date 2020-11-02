const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  primary: {
    light: colors.purple["500"],
    lighter: colors.purple["600"],
    default: colors.purple["700"],
    darker: colors.purple["800"],
    dark: colors.purple["900"],
  },
  secondary: {
    light: colors.blue["400"],
    lighter: colors.blue["500"],
    default: colors.blue["600"],
    darker: colors.blue["700"],
    dark: colors.blue["800"],
  },
  light: {
    lighter: colors.gray["200"],
    default: colors.gray["300"],
    darker: colors.gray["400"],
  },
  dark: {
    lighter: colors.gray["700"],
    default: colors.gray["800"],
    darker: colors.gray["900"],
  },
};
