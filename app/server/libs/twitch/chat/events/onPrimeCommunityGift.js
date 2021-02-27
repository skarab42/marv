const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onPrimeCommunityGift(channel, user, subInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
  const { gifter, name } = subInfo;
  pushActions("onPrimeCommunityGift", { user: gifter, name, ...userVars });
};
