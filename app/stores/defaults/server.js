const { name } = require("../../package");
const { appPath } = require("../utils");
const envPaths = require("env-paths");
const path = require("path");

const userDir = envPaths(name).data;

module.exports = {
  port: 4242,
  host: "localhost",
  clientPath: path.join(appPath, "client"),
  staticPath: path.join(appPath, "static"),
  uploadPath: path.join(userDir, "files"),
};
