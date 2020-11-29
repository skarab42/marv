const pushActions = require("../../pushActions");

module.exports = function onJoin(channel, user) {
  console.log(">>> onJoin:", { channel, user });
  pushActions("onJoin", { user });
};
