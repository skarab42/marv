const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onRaid(channel, user, raidInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
  const { displayName, viewerCount } = raidInfo;
  pushActions("onRaid", { channel: displayName, viewerCount, ...userVars });
};
