const pushActions = require("../../pushActions");

module.exports = function onResub(channel, user, subInfo) {
  console.log(">>> onResub:", { channel, user, subInfo });
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
  });
};
