const { name, version } = require("../../package");

module.exports = {
  name,
  version,
  openOnStartup: false,
  fingerprint: `${name} v${version}`,
};
