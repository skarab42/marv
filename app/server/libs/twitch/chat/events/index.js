const twitch = require("../../index");
const path = require("path");
const fs = require("fs");

module.exports = function init() {
  fs.readdirSync(__dirname).forEach((filename) => {
    const name = path.parse(filename).name;

    if (name === "index") return;

    twitch.chat[name](require(`./${name}`).bind(twitch.chat));
  });
};
