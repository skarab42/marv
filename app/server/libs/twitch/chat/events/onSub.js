const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onSub(channel, user, subInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
  const {
    displayName,
    isPrime,
    message,
    months,
    plan,
    planName,
    streak,
  } = subInfo;

  pushActions("onSub", {
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
