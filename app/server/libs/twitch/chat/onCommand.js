const getCommandByName = require("../api/getCommandByName");
const pushActions = require("../pushActions");
const { _ } = require("../../i18next");
const ms = require("ms");

const cooldowns = {};

module.exports = async function onCommand({ channel, command, nick, message }) {
  const commandEntry = await getCommandByName(command.name);
  const now = Date.now();

  if (!commandEntry) {
    throw new Error(
      `${_("twitch.command-not-found", { command: command.name })}`
    );
  }

  if (!commandEntry.enabled) {
    throw new Error(
      `${_("twitch.command-disabled", { command: command.name })}`
    );
  }

  const lastCall = cooldowns[command.name] || 0;
  const cooldown = commandEntry.cooldown * 1000;
  const elapsedTime = now - lastCall;

  if (elapsedTime < cooldown) {
    const rest = ms(cooldown - elapsedTime);
    this.say(
      channel,
      _("twitch.command-cooldown", { command: command.name, rest })
    );
    return;
  }

  cooldowns[command.name] = now;
  pushActions("onCommand", { user: nick, message, command });
};
