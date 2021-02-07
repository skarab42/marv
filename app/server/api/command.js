const settings = require("../libs/settings");

module.exports = {
  setPrefix: (prefix) => {
    return settings.set("command.prefix", prefix, "string");
  },
  getSettings: async () => {
    return await settings.getAll("command.");
  },
};
