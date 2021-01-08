const Command = require("../../../db/Models/Command");

module.exports = async function getCommandByName(name) {
  return await Command.findOne({ where: { name }, order: [["name", "ASC"]] });
};
