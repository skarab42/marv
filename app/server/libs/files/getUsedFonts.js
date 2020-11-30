const stores = require("../../../stores");

module.exports = function getUsedFonts() {
  const usedFonts = [];

  Object.values(stores.actions.get("actions", {})).forEach((action) => {
    action.items.forEach((item) => {
      if (item.type === "file" && item.target.type === "text") {
        usedFonts.push(item.target.style["font-family"]);
      }
    });
  });

  return [...new Set(usedFonts)];
};
