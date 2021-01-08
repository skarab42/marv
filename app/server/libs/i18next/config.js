const { watch } = require("../../../utils");

module.exports = {
  lng: "en",
  ns: "app",
  defaultNS: "app",
  fallbackLng: "en",
  supportedLngs: ["en", "fr", "es"],
  saveMissingTo: "all",
  saveMissing: watch,
};
