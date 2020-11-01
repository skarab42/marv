const { name, version } = require("../../package");
const { appPath } = require("./utils");
const path = require("path");

module.exports = {
  name,
  version,
  path: appPath,
  fingerprint: `${name} v${version}`,
  icon: path.join(appPath, "static/icon.ico")
};
