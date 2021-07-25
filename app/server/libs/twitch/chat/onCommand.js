const getCommandByName = require("../api/getCommandByName");
const pushActions = require("../pushActions");
const appApi = require("../../../api/app");
const getUser = require("../api/getUser");
const jsonLogic = require("../jsonLogic");
const { _ } = require("../../i18next");
const ejs = require("ejs");
const ms = require("ms");

const cooldowns = {};

const api = {
  getUser,
};

function parseUsage(usage) {
  return (usage || "")
    .replace(/[ ,]+/g, " ")
    .trim()
    .split(" ")
    .filter((arg) => arg.length);
}

function isInvalidRules(command, args) {
  return (
    command.rules &&
    command.rules.length &&
    !jsonLogic.apply(command.rules[0], args)
  );
}

module.exports = async function onCommand({
  channel,
  command,
  nick,
  message,
  userVars,
}) {
  const commandEntry = await getCommandByName(command.name);

  if (!commandEntry || !commandEntry.enabled) {
    return;
  }

  const now = Date.now();
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

  let args = {};

  const argNames = parseUsage(commandEntry.usage);
  const argList = argNames.map((arg) => `[${arg}]`).join(" ");
  const usage = `${command.prefix}${command.name} ${argList}`;

  if (command.args.length < argNames.length) {
    throw new Error(`${_("twitch.command-not-enough-argument", { usage })}`);
  }

  if (command.args.length > argNames.length) {
    const i = argNames.length - 1;
    const rest = command.args.splice(i, command.args.length - i);
    command.args.push(rest.join(" "));
  }

  argNames.forEach((arg, i) => {
    const value = command.args[i] || `$${arg}`;
    const float = parseFloat(value);
    args[arg] = isNaN(value) ? value : float;
  });

  args = {
    ...args,
    ...userVars,
    user: nick,
  };

  if (isInvalidRules(commandEntry, args)) {
    return;
  }

  cooldowns[command.name] = now;

  pushActions("onCommand", { message, command, ...args });

  let chatMessage = (commandEntry.message || "").trim();

  if (chatMessage.length) {
    args.api = api;

    chatMessage = chatMessage.replace(/[\r\n]+/g, " ");

    try {
      this.say(channel, await ejs.render(chatMessage, args, { async: true }));
    } catch (error) {
      appApi.stateNotify("error", _("errors.unable_to_render_ejs"), command);
    }
  }
};
