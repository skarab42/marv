const pushActions = require("../../pushActions");

module.exports = function onSubExtend(channel, user, subInfo) {
  const { displayName, endMonth, months, plan } = subInfo;
  pushActions("onSubExtend", {
    user: displayName,
    months,
    endMonth,
    tiers: plan,
  });
};
