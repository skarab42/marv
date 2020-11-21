const stores = require("../../stores");
const { i18next, getConfig } = require("../libs/i18next");

module.exports = {
  getConfig: () => getConfig(),
  changeLanguage: (language) => {
    i18next.changeLanguage(language);
    stores.app.set("language", language);
  },
};
