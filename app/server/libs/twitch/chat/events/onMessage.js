const getStreamByChannel = require("../../api/getStreamByChannel");
const pushActions = require("../../pushActions");
const chalk = require("chalk");

const colors = new chalk.Instance({ level: 3 });

module.exports = async function onMessage(channel, nick, message, data) {
  pushActions("onMessage", { user: nick, message });

  const color = colors.hex(data._tags.get("color"));
  console.log("\x1b[35m%s\x1b[0m", "[chat]", color(`<${nick}>`), message);

  if (message === "!stream") {
    const { viewer_count } = await getStreamByChannel(channel);
    this.say(channel, `Vous êtes ${viewer_count} :)`);
  }
};
