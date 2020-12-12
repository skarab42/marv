const { Umzug, SequelizeStorage } = require("umzug");
const { watch } = require("../../utils");
const sequelize = require("./index");
const path = require("path");

module.exports = new Umzug({
  context: sequelize.getQueryInterface(),
  migrations: { glob: path.join(__dirname, "migrations/*.js") },
  storage: new SequelizeStorage({ sequelize }),
  logger: watch ? console : undefined,
});
