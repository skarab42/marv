const { databasePath, databaseFilename } = require("../../utils");
const { Sequelize } = require("sequelize");
const fs = require("fs-extra");
const path = require("path");

fs.ensureDirSync(databasePath);

const sequelize = new Sequelize({
  logging: false,
  dialect: "sqlite",
  storage: path.join(databasePath, databaseFilename),
});

module.exports = sequelize;
