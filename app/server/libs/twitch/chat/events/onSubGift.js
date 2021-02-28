const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onSubGift(channel, user, subInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
  const {
    toUser: displayName,
    fromUser: gifter,
    total: gifterGiftCount,
    duration: giftDuration,
    isPrime,
    message,
    months,
    plan,
    planName,
    streak,
  } = subInfo;

  pushActions("onSubGift", {
    toUser: displayName,
    fromUser: gifter,
    total: gifterGiftCount,
    duration: giftDuration,
    isPrime,
    message,
    months,
    plan,
    planName,
    streak,
    ...userVars,
  });
};
