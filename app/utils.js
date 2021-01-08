const { name, version } = require("./package");
const capitalize = require("capitalize");
const envPaths = require("env-paths");
const fs = require("fs-extra");
const path = require("path");

const app = { name, version };
const fingerprint = `${capitalize(name)} v${version}`;

const appPath = __dirname;
const userPath = envPaths(name).data;
const clientPath = path.join(appPath, "client");
const staticPath = path.join(appPath, "static");
const uploadPath = path.join(userPath, "upload");
const storesPath = path.join(userPath, "stores");
const filesPath = path.join(uploadPath, "files");
const databasePath = path.join(userPath, "database");
const databaseFilename = "marv.sqlite";

const isFirstStart = !fs.existsSync(path.join(databasePath, databaseFilename));
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
  fingerprint,
  databasePath,
  databaseFilename,
  isFirstStart,
};
