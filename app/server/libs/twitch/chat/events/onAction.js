const pushActions = require("../../pushActions");

module.exports = function onAction(channel, user, message) {
  const date = new Intl.DateTimeFormat("fr-FR").format(Date.now());
  pushActions("onAction", { user, message, date });
};
