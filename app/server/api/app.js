const { getSystemFonts } = require("../libs/files");
const stores = require("../../stores");

async function getFontsNames() {
  const { fontNames } = await getSystemFonts();

  return fontNames;
}

function getUsedFonts() {
  const usedFonts = [];

  Object.values(stores.actions.get("actions", {})).forEach((action) => {
    action.items.forEach((item) => {
      if (item.type === "file" && item.target.type === "text") {
        usedFonts.push(item.target.style["font-family"]);
      }
    });
  });

  return [...new Set(usedFonts)];
}

module.exports = {
  getOS: () => {
    return process.platform;
  },
  getFonts: () => {
    return getFontsNames();
  },
  getUsedFonts: () => {
    return getUsedFonts();
  },
};
