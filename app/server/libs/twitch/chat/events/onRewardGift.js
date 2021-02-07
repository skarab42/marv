const pushActions = require("../../pushActions");

module.exports = function onRewardGift(channel, user, rewardGiftInfo) {
  const {
    count,
    domain,
    gifterDisplayName,
    gifterGiftCount,
    triggerType,
  } = rewardGiftInfo;

  pushActions("onRewardGift", {
    count,
    domain,
    type: triggerType,
    user: gifterDisplayName,
    total: gifterGiftCount,
  });
};
