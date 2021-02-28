const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onRitual(channel, user, ritualInfo, data) {
  const userVars = api.getChatUserInfoVars(data);
  const { ritualName, message } = ritualInfo;
  pushActions("onRitual", { ritualName, message, ...userVars });
};
