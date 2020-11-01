const backend = require("i18next-fs-backend");
const i18next = require("i18next");
const path = require("path");

const config = require("../../main/config");
const store = require("../store");

const options = config.i18next;
const preload = options.supportedLngs;
const lng = store.app.get("lang", options.lng);
const locales = path.join(config.server.staticPath, "locales");

const _ = i18next.use(backend).init({
  ...options,
  preload,
  lng,
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
      preload.forEach(lng => {
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
