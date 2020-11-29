const pushActions = require("../../pushActions");

module.exports = function onPrimeCommunityGift(channel, user, subInfo) {
  console.log(">>> onPrimeCommunityGift:", { channel, user, subInfo });
  const { gifter } = subInfo;
  pushActions("onPrimeCommunityGift", { user: gifter, name });
};
