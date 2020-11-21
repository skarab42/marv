const { appPath } = require("../../../utils");
const backend = require("i18next-fs-backend");
const stores = require("../../../stores");
const config = require("./config");
const i18next = require("i18next");
const path = require("path");

const locales = path.join(appPath, "static/locales");

function getConfig() {
  return { ...config, lng: stores.app.get("language") };
}

function _(...args) {
  return i18next.t(...args);
}

i18next.use(backend).init({
  ...getConfig(),
  initImmediate: false,
  backend: {
    addPath: `${locales}/{{lng}}/{{ns}}.json`,
    loadPath: `${locales}/{{lng}}/{{ns}}.json`,
  },
});

module.exports = { i18next, _, getConfig };
