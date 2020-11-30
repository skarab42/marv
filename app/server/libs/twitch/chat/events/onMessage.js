const pushActions = require("../../pushActions");
const onCommand = require("../onCommand");

const chalk = require("chalk");
const colors = new chalk.Instance({ level: 3 });

const cmdPrefix = "#";

async function terminalChat(channel, nick, message, data) {
  const color = colors.hex(data._tags.get("color"));
  console.log("\x1b[35m%s\x1b[0m", "[chat]", color(`<${nick}>`), message);
}

function isCommand(message) {
  return message.startsWith(cmdPrefix);
}

function parseCommand(message) {
  const args = message.slice(cmdPrefix.length).split(" ");
  const name = args.shift();
  return { name, args };
}

module.exports = async function onMessage(channel, nick, message, data) {
  pushActions("onMessage", { user: nick, message });
  terminalChat(channel, nick, message, data);

  if (!isCommand(message)) return;

  const command = parseCommand(message);

  try {
    const _onCommand = onCommand.bind(this);
    await _onCommand({ command, channel, nick, message, data });
  } catch (error) {
    this.say(channel, error.message);
  }
};
