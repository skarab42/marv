const pushActions = require("../pushActions");

module.exports = async function onRedemption(message) {
  const { id, user, reward, user_input } = message._data.data.redemption;
  pushActions("onRedemption", {
    id,
    user: user.display_name,
    reward,
    message: user_input || "",
  });
};
