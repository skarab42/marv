const Command = require("../../../db/Models/Command");

module.exports = async function removeCommand(command) {
  return await Command.destroy({ where: { id: command.id } });
};
