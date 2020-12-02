const getCommandPrefix = require("../../api/getCommandPrefix");
const pushActions = require("../../pushActions");
const onCommand = require("../onCommand");

const chalk = require("chalk");
const colors = new chalk.Instance({ level: 3 });

async function terminalChat(channel, nick, message, data) {
  const color = colors.hex(data._tags.get("color"));
  console.log("\x1b[35m%s\x1b[0m", "[chat]", color(`<${nick}>`), message);
}

function isCommand(prefix, message) {
  return message.startsWith(prefix);
}

function parseCommand(prefix, message) {
  const args = message.slice(prefix.length).split(" ");
  const name = args.shift();

  return { prefix, name, args };
}

module.exports = async function onMessage(channel, nick, message, data) {
  pushActions("onMessage", { user: nick, message });
  terminalChat(channel, nick, message, data);

  const prefix = getCommandPrefix();
  if (!isCommand(prefix, message)) return;
  const command = parseCommand(prefix, message);

  try {
    const _onCommand = onCommand.bind(this);
    await _onCommand({ command, channel, nick, message, data });
  } catch (error) {
    this.say(channel, error.message);
  }
};
