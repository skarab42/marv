const pushActions = require("../../pushActions");

module.exports = function onRitual(channel, user, ritualInfo) {
  console.log(">>> onRitual:", { channel, user, ritualInfo });
  const { ritualName, message } = ritualInfo;
  pushActions("onRitual", { ritualName, message });
};
