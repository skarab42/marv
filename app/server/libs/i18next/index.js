const { appPath } = require("../../../utils");
const backend = require("i18next-fs-backend");
const stores = require("../../../stores");
const i18next = require("i18next");
const path = require("path");

const options = stores.i18next.getAll();
const locales = path.join(appPath, "static/locales");

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
