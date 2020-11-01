const stores = require("../../stores");

module.exports = (/* socket */) => {
  return {
    i18next(method, ...args) {
      return stores.i18next[method](...args);
    },
  };
};
