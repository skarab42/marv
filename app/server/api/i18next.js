const settings = require("../libs/settings");
const { i18next, getConfig } = require("../libs/i18next");

module.exports = {
  getConfig: async () => await getConfig(),
  changeLanguage: (language) => {
    i18next.changeLanguage(language);
    settings.set("app.language", language);
  },
};
