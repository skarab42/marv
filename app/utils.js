const { name, version } = require("./package");
const envPaths = require("env-paths");
const path = require("path");

const appPath = __dirname;
const app = { name, version };
const userPath = envPaths(name).data;
const clientPath = path.join(appPath, "client");
const staticPath = path.join(appPath, "static");
const uploadPath = path.join(userPath, "upload");
const storesPath = path.join(userPath, "stores");
const filesPath = path.join(uploadPath, "files");
const watch = process.argv.includes("--watch") || process.argv.includes("-w");

module.exports = {
  app,
  watch,
  appPath,
  userPath,
  filesPath,
  uploadPath,
  storesPath,
  staticPath,
  clientPath,
};
