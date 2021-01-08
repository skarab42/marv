const { databasePath } = require("../../utils");
const { Sequelize } = require("sequelize");
const config = require("./config");
const fs = require("fs-extra");

fs.ensureDirSync(databasePath);

module.exports = new Sequelize(config);
