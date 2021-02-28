const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onPrimePaidUpgrade(channel, user, subInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
  const { displayName, plan } = subInfo;
  pushActions("onPrimePaidUpgrade", {
    user: displayName,
    tiers: plan,
    ...userVars,
  });
};
