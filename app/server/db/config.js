const { databasePath, databaseFilename } = require("../../utils");
const path = require("path");

module.exports = {
  dialect: "sqlite",
  storage: path.join(databasePath, databaseFilename),
  logging: false,
};
