const getCommandNames = require("../api/getCommandNames");
const pushActions = require("../pushActions");
const { _ } = require("../../i18next");

module.exports = async function onCommand({ command, nick, message }) {
  const commands = await getCommandNames();

  if (!commands.includes(command.name)) {
    throw new Error(`${_("twitch.command-not-found")} ${command.name}`);
  }

  pushActions("onCommand", { user: nick, message, command });
};
