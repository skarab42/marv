const pushActions = require("../../pushActions");

module.exports = function onBan(channel, user) {
  pushActions("onBan", { user });
};
