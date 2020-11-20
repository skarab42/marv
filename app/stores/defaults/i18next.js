const { watch } = require("../../utils");

module.exports = {
  ns: "app",
  lng: "en",
  defaultNS: "app",
  fallbackLng: "en",
  supportedLngs: ["en", "fr"],
  saveMissingTo: "all",
  saveMissing: watch,
};
