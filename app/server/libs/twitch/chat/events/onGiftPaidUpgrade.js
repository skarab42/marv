const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onGiftPaidUpgrade(channel, user, subInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
  const { gifter, displayName, plan } = subInfo;
  pushActions("onGiftPaidUpgrade", {
    fromUser: gifter,
    toUser: displayName,
    tiers: plan,
    ...userVars,
  });
};
