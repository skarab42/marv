const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onCommunityPayForward(
  channel,
  user,
  forwardInfo,
  data
) {
  const userVars = api.getChatUserInfoVars(data);
  const { displayName, originalGifterDisplayName } = forwardInfo;
  pushActions("onCommunityPayForward", {
    fromUser: originalGifterDisplayName,
    toUser: displayName,
    ...userVars,
  });
};
