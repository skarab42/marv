const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onSubExtend(channel, user, subInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
  const { displayName, endMonth, months, plan } = subInfo;
  pushActions("onSubExtend", {
    user: displayName,
    months,
    endMonth,
    tiers: plan,
    ...userVars,
  });
};
