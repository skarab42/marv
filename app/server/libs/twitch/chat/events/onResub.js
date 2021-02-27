const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onResub(channel, user, subInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
  const {
    displayName,
    plan,
    planName,
    streak,
    isPrime,
    months,
    message,
  } = subInfo;

  pushActions("onResub", {
    user: displayName,
    plan: planName,
    streak,
    isPrime,
    months,
    message,
    tiers: plan,
    ...userVars,
  });
};
