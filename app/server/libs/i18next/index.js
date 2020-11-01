const backend = require("i18next-fs-backend");
const i18next = require("i18next");
const path = require("path");
const stores = require("../../../stores");

const options = stores.i18next.getAll();
const locales = path.join(stores.server.get("staticPath"), "locales");

const _ = i18next.use(backend).init({
  ...options,
  initImmediate: false,
  backend: {
    loadPath: `${locales}/{{lng}}/{{ns}}.json`,
    addPath: `${locales}/{{lng}}/{{ns}}.json`,
  },
});

module.exports = { _, i18next };
