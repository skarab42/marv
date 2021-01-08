const pushActions = require("../../pushActions");

module.exports = function onCommunityPayForward(channel, user, forwardInfo) {
  const { displayName, originalGifterDisplayName } = forwardInfo;
  pushActions("onCommunityPayForward", {
    fromUser: originalGifterDisplayName,
    toUser: displayName,
  });
};
