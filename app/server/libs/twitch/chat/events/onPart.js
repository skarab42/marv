const pushActions = require("../../pushActions");

module.exports = function onPart(channel, user) {
  console.log(">>> onPart:", { channel, user });
  pushActions("onPart", { user });
};
