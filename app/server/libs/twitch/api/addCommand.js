const Command = require("../../../db/Models/Command");

module.exports = function addCommand(command) {
  return Command.create(command);
};
