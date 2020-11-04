const backend = require("i18next-fs-backend");
const i18next = require("i18next");
const path = require("path");
const stores = require("../../../stores");

const options = stores.i18next.getAll();
const locales = path.join(stores.server.get("staticPath"), "locales");

i18next.use(backend).init({
  ...options,
  initImmediate: false,
  backend: {
    loadPath: `${locales}/{{lng}}/{{ns}}.json`,
    addPath: `${locales}/{{lng}}/{{ns}}.json`,
  },
});

const _ = (...args) => i18next.t(...args);

module.exports = { i18next, _ };
