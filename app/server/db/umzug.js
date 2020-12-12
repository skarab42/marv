const { Umzug, SequelizeStorage } = require("umzug");
const { watch } = require("../../utils");
const sequelize = require("./index");

const migrations = new Umzug({
  context: sequelize.getQueryInterface(),
  migrations: { glob: ["migrations/*.js", { cwd: __dirname }] },
  storage: new SequelizeStorage({
    sequelize,
    modelName: "SequelizeMigrations",
  }),
  logger: watch ? console : undefined,
});

const seeders = new Umzug({
  context: sequelize.getQueryInterface(),
  migrations: { glob: ["seeders/*.js", { cwd: __dirname }] },
  storage: new SequelizeStorage({ sequelize, modelName: "SequelizeSeeders" }),
  logger: watch ? console : undefined,
});

module.exports = {
  async up() {
    await migrations.up();
    await seeders.up();
  },
};
