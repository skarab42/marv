const pushActions = require("../../pushActions");
const api = require("../../api/getUserInfoVars");

module.exports = function onAction(channel, user, message, data) {
  const userVars = api.getChatUserInfoVars(data);
  pushActions("onAction", { user, message, ...userVars });
};
