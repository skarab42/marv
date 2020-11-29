const twitch = require("../../index");
const path = require("path");
const fs = require("fs");

const eventNames = ["onFollow"];

fs.readdirSync(__dirname).forEach((filename) => {
  const name = path.parse(filename).name;
  if (name === "index") return;
  eventNames.push(name);
  twitch.chat[name](require(`./${name}`).bind(twitch.chat));
});

module.exports = { eventNames };
