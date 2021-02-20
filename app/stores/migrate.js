const StoreMigration = require("../server/db/Models/StoreMigration");
const loggers = require("../server/libs/loggers");
const path = require("path");
const fs = require("fs");

const migrationsPath = path.join(__dirname, "migrations");
const logger = loggers.get("server");

async function up() {
  const files = fs.readdirSync(migrationsPath).sort((a, b) => a - b);
  const migrations = await StoreMigration.findAll({
    attributes: ["name"],
    raw: true,
  });

  for (let i = 0, l = files.length; i < l; i++) {
    const file = files[i];
    if (!migrations.find((m) => m.name === file)) {
      logger.info(`[store] migration from ${file}`);
      const { up } = require(path.join(migrationsPath, file));
      await up();
      StoreMigration.create({ name: file });
    }
  }
}

async function down() {
  logger.warn("[store] up method not implemented !!!");
}

module.exports = {
  up,
  down,
};
