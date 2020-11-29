const pushActions = require("../../pushActions");

module.exports = function onRaid(channel, user, raidInfo) {
  console.log(">>> onRaid:", { channel, user, raidInfo });
  const { displayName, viewerCount } = raidInfo;
  pushActions("onRaid", { channel: displayName, viewerCount });
};
