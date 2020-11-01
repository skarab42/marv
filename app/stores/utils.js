const path = require("path");

const appPath = path.resolve(__dirname, "..");
const watch = process.argv.includes("--watch") || process.argv.includes("-w");

module.exports = {
  watch,
  appPath
};
