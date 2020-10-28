const backend = require("i18next-fs-backend");
const i18next = require("i18next");
const path = require("path");
const fs = require("fs");

const dev = true;

const locales = path.resolve(__dirname, "../static/locales");

const _ = i18next.use(backend).init({
  ns: "app",
  defaultNS: "app",
  lng: "en",
  fallbackLng: "en",
  debug: dev,
  saveMissing: dev,
  saveMissingTo: "all",
  initImmediate: false,
  backend: {
    loadPath: `${locales}/{{lng}}/{{ns}}.json`,
    addPath: `${locales}/{{lng}}/{{ns}}.json`
  },
  preload: fs.readdirSync(locales).filter(file => {
    return fs.lstatSync(path.join(locales, file)).isDirectory();
  })
});

function missingKeyHandler(req, res) {
  const { lng, ns } = req.params;

  if (!i18next.services.backendConnector) {
    res.statusCode = 404;
    res.end("i18next-express-middleware:: no backend configured");
    return;
  }

  for (let m in req.body) {
    i18next.services.backendConnector.saveMissing([lng], ns, m, req.body[m]);
  }

  res.end("ok");
}

module.exports = {
  _,
  i18next,
  missingKeyHandler
};
