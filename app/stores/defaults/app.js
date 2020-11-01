const { name, version } = require("../../package");
const { watch, appPath } = require("../utils");
const path = require("path");

module.exports = {
  name,
  version,
  path: appPath,
  production: !watch,
  openOnStartup: false,
  fingerprint: `${name} v${version}`,
  icon: path.join(appPath, "static/icon.ico"),
};
