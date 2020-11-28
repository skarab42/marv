const { name, version } = require("../../package");

module.exports = {
  name,
  version,
  language: "en",
  openOnStartup: true,
  showFirstStartInfo: true,
  fingerprint: `${name} v${version}`,
};
