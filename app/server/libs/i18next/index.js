const { appPath } = require("../../../utils");
const backend = require("i18next-fs-backend");
const settings = require("../settings");
const config = require("./config");
const i18next = require("i18next");
const path = require("path");

const locales = path.join(appPath, "static/locales");

function getLocale() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0];
  } catch (error) {
    console.log("ERROR >>>", error);
    return "en";
  }
}

async function getConfig() {
  const isFirstStart = await settings.get("app.showFirstStartInfo", true);

  if (isFirstStart) {
    await settings.set("app.language", getLocale());
  }

  return { ...config, lng: await settings.get("app.language") };
}

function _(...args) {
  return i18next.t(...args);
}

async function init() {
  const settings = await getConfig();

  i18next.use(backend).init({
    ...settings,
    initImmediate: false,
    backend: {
      addPath: `${locales}/{{lng}}/{{ns}}.json`,
      loadPath: `${locales}/{{lng}}/{{ns}}.json`,
    },
  });
}

module.exports = { init, i18next, _, getConfig };
