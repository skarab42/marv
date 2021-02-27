const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onStandardPayForward(
  channel,
  user,
  forwardInfo,
  data
) {
  const userVars = api.getChatUserInfoVars(data);
  const {
    displayName,
    recipientDisplayName,
    originalGifterDisplayName,
  } = forwardInfo;

  pushActions("onStandardPayForward", {
    user: displayName,
    fromUser: originalGifterDisplayName,
    toUser: recipientDisplayName,
    ...userVars,
  });
};
