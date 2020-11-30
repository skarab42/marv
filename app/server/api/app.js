const { getSystemFonts, getUsedFonts } = require("../libs/files");

module.exports = {
  getOS: () => {
    return process.platform;
  },
  getFonts: async () => {
    return (await getSystemFonts()).fontNames;
  },
  getUsedFonts: () => {
    return getUsedFonts();
  },
};
