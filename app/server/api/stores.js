const stores = require("../../stores");

module.exports = {
  panels: (method, ...args) => stores.panels[method](...args),
};
