const { name } = require("../package");
const envPaths = require("env-paths");
const path = require("path");

const userPaths = envPaths(name);
const appPath = path.resolve(__dirname, "..");
const watch = process.argv.includes("--watch") || process.argv.includes("-w");

module.exports = {
  watch,
  appPath,
  userPaths,
};
