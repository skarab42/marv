const Command = require("../../../db/Models/Command");

module.exports = async function getCommandList() {
  return await Command.findAll();
};
