const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onBitsBadgeUpgrade(channel, user, upgradeInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
  const { displayName, threshold } = upgradeInfo;
  pushActions("onBitsBadgeUpgrade", {
    user: displayName,
    threshold,
    ...userVars,
  });
};
