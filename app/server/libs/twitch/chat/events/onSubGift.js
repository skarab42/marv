const pushActions = require("../../pushActions");

module.exports = function onSubGift(channel, user, subInfo) {
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
  });
};
