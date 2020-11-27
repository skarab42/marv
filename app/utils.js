const { name, version } = require("./package");
const envPaths = require("env-paths");
const fs = require("fs-extra");
const path = require("path");

const app = { name, version };

const appPath = __dirname;
const userPath = envPaths(name).data;
const clientPath = path.join(appPath, "client");
const staticPath = path.join(appPath, "static");
const uploadPath = path.join(userPath, "upload");
const storesPath = path.join(userPath, "stores");
const filesPath = path.join(uploadPath, "files");
const databasePath = path.join(userPath, "database");

const isFirstStart = !fs.existsSync(databasePath);
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
  databasePath,
  isFirstStart,
};
