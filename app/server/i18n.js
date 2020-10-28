const config = require("../config");
const backend = require("i18next-fs-backend");
const i18next = require("i18next");
const path = require("path");
const fs = require("fs");

const dev = config.watch;
const [ns, lng] = ["app", "en"];
const supportedLngs = ["en", "fr"];
const locales = path.resolve(__dirname, "../static/locales");

const _ = i18next.use(backend).init({
  // debug: dev,
  ns,
  lng,
  supportedLngs,
  defaultNS: ns,
  fallbackLng: lng,
  preload: supportedLngs,
  saveMissing: dev,
  saveMissingTo: "all",
  initImmediate: false,
  backend: {
    loadPath: `${locales}/{{lng}}/{{ns}}.json`,
    addPath: `${locales}/{{lng}}/{{ns}}.json`
  }
});

function missingKeyHandler(req, res) {
  const { lng, ns } = req.params;

  if (!i18next.services.backendConnector) {
    res.statusCode = 404;
    res.end("i18next: no backend configured");
    return;
  }

  for (let m in req.body) {
    const v = req.body[m];
    if (i18next.options.saveMissingTo === "all") {
      supportedLngs.forEach(lng => {
        i18next.services.backendConnector.saveMissing([lng], ns, m, v);
      });
    } else {
      i18next.services.backendConnector.saveMissing([lng], ns, m, v);
    }
  }

  res.end("ok");
}

module.exports = {
  _,
  i18next,
  missingKeyHandler
};
