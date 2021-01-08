const pushActions = require("../../pushActions");

module.exports = function onJoin(channel, user) {
  pushActions("onJoin", { user });
};
