const { name, version } = require("../../package");
const { watch } = require("../../utils");

module.exports = {
  name,
  version,
  production: !watch,
  openOnStartup: false,
  icon: "static/icon.png",
  fingerprint: `${name} v${version}`,
};
