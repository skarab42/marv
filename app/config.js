const { name, version } = require("./package");
const path = require("path");

const watch = process.argv.includes("--watch") || process.argv.includes("-w");

module.exports = {
  watch,
  app: {
    name,
    version,
    fingerprint: `${name} v${version}`,
    icon: path.join(__dirname, "static/icon.ico")
  },
  server: {
    port: 4242,
    host: "localhost",
    clientPath: path.join(__dirname, "client"),
    staticPath: path.join(__dirname, "static")
  },
  i18next: {
    ns: "app",
    lng: "en",
    defaultNS: "app",
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],
    saveMissing: watch,
    saveMissingTo: "all"
  }
};
