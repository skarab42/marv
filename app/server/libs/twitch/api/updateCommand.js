const Command = require("../../../db/Models/Command");

module.exports = function updateCommand(command) {
  return Command.update(command, { where: { name: command.name } });
};
