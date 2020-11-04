const stores = require("../../stores");

module.exports = (/* socket */) => {
  return {
    app(method, ...args) {
      return stores.app[method](...args);
    },
    i18next(method, ...args) {
      return stores.i18next[method](...args);
    },
    obs(method, ...args) {
      return stores.obs[method](...args);
    },
    panels(method, ...args) {
      return stores.panels[method](...args);
    },
  };
};
