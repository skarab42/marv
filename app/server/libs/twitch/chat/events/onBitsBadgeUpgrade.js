const pushActions = require("../../pushActions");

module.exports = function onBitsBadgeUpgrade(channel, user, upgradeInfo) {
  const { displayName, threshold } = upgradeInfo;
  pushActions("onBitsBadgeUpgrade", { user: displayName, threshold });
};
