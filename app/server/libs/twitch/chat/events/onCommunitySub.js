const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onCommunitySub(channel, user, subInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
  const { count, gifter, gifterGiftCount, plan } = subInfo;
  pushActions("onCommunitySub", {
    user: gifter,
    count,
    total: gifterGiftCount,
    tiers: plan,
    ...userVars,
  });
};
