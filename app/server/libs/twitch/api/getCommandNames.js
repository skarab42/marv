const getCommandList = require("./getCommandList");

module.exports = async function getCommandNames() {
  return (await getCommandList()).map((command) => command.name);
};
