const { name } = require("./package");
const envPaths = require("env-paths");

const appPath = __dirname;
const userPaths = envPaths(name);
const watch = process.argv.includes("--watch") || process.argv.includes("-w");

module.exports = {
  watch,
  appPath,
  userPaths,
};
