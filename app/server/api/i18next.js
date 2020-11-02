const stores = require("../../stores");
const { i18next } = require("../libs/i18next");

module.exports = (/* socket */) => {
  return {
    changeLanguage(language) {
      i18next.changeLanguage(language);
      stores.i18next.set("lng", language);
    },
  };
};
