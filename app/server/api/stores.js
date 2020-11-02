const stores = require("../../stores");

module.exports = (/* socket */) => {
  return {
    app(method, ...args) {
      return stores.app[method](...args);
    },
    i18next(method, ...args) {
      return stores.i18next[method](...args);
    },
  };
};
