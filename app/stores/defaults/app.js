const { name, version } = require("../../package");

module.exports = {
  name,
  version,
  language: "en",
  openOnStartup: false,
  fingerprint: `${name} v${version}`,
};
