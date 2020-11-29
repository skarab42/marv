const pushActions = require("../../pushActions");

module.exports = function onSub(channel, user, subInfo) {
  console.log(">>> onSub:", { channel, user, subInfo });
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
  });
};
