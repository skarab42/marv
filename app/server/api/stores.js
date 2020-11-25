const stores = require("../../stores");

module.exports = {
  obs: (method, ...args) => stores.obs[method](...args),
  app: (method, ...args) => stores.app[method](...args),
  twitch: (method, ...args) => stores.twitch[method](...args),
  panels: (method, ...args) => stores.panels[method](...args),
  i18next: (method, ...args) => stores.i18next[method](...args),
};
