const scope = require("../twitch-scopes");
const Setting = require("../Models/Setting");

const newScope = [...scope, "channel:read:subscriptions"];

module.exports = {
  up: async () => {
    await Setting.update(
      { value: JSON.stringify(newScope) },
      { where: { key: "twitch.scope" } }
    );
  },
  down: async () => {},
};
