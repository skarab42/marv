const pushActions = require("../../pushActions");

module.exports = function onCommunitySub(channel, user, subInfo) {
  const { count, gifter, gifterGiftCount, plan } = subInfo;
  pushActions("onCommunitySub", {
    user: gifter,
    count,
    total: gifterGiftCount,
    tiers: plan,
  });
};
