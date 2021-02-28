const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onRewardGift(channel, user, rewardGiftInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
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
    ...userVars,
  });
};
