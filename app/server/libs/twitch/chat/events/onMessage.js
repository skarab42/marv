const api = require("../../api/getUserInfoVars");
const pushActions = require("../../pushActions");
const settings = require("../../../settings");
const onCommand = require("../onCommand");

function isCommand(prefix, message) {
  return message.startsWith(prefix);
}

function parseCommand(prefix, message) {
  const args = message.slice(prefix.length).split(" ");
  const name = args.shift();

  return { prefix, name, args };
}

module.exports = async function onMessage(channel, nick, message, data) {
  const userVars = api.getChatUserInfoVars(data);
  pushActions("onMessage", { user: nick, message, ...userVars });

  const prefix = await settings.get("command.prefix");
  if (!isCommand(prefix, message)) return;
  const command = parseCommand(prefix, message);

  try {
    const _onCommand = onCommand.bind(this);
    await _onCommand({ command, channel, nick, message, userVars });
  } catch (error) {
    this.say(channel, error.message);
  }
};
