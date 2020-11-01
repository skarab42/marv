const { appPath } = require("./utils");
const path = require("path");

module.exports = {
  port: 4242,
  host: "localhost",
  clientPath: path.join(appPath, "client"),
  staticPath: path.join(appPath, "static")
};
