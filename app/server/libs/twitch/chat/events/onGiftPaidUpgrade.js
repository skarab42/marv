const pushActions = require("../../pushActions");

module.exports = function onGiftPaidUpgrade(channel, user, subInfo) {
  const { gifter, displayName, plan } = subInfo;
  pushActions("onGiftPaidUpgrade", {
    fromUser: gifter,
    toUser: displayName,
    tiers: plan,
  });
};
