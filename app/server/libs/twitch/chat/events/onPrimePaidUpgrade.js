const pushActions = require("../../pushActions");

module.exports = function onPrimePaidUpgrade(channel, user, subInfo) {
  const { displayName, plan } = subInfo;
  pushActions("onPrimePaidUpgrade", { user: displayName, tiers: plan });
};
