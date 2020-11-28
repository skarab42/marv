const pushActions = require("../../pushActions");

module.exports = function onRaid(channel, user, raidInfo) {
  console.log(">>> raid:", { channel, user, raidInfo });
  const { displayName, viewerCount } = raidInfo;
  pushActions("raid", { channel: displayName, viewerCount });
};
