const { name, version } = require("../../package");

module.exports = {
  name,
  version,
  language: "en",
  openOnStartup: false,
  showFirstStartInfo: true,
  fingerprint: `${name} v${version}`,
};
