const pushActions = require("../../pushActions");

module.exports = function onStandardPayForward(channel, user, forwardInfo) {
  console.log(">>> onStandardPayForward:", { channel, user, forwardInfo });
  const {
    displayName,
    recipientDisplayName,
    originalGifterDisplayName,
  } = forwardInfo;
  pushActions("onStandardPayForward", {
    user: displayName,
    fromUser: originalGifterDisplayName,
    toUser: recipientDisplayName,
  });
};
