const api = require("../api/getUserInfoVars");
const pushActions = require("../pushActions");

module.exports = async function onBits(message) {
  const data = message._data.data;
  const userVars = await api.getPubSubUserInfoVars({
    login: data.user_name,
    id: data.user_id,
  });

  pushActions("onBits", {
    user: data.is_anonymous ? "Anonymous" : data.user_name,
    message: data.chat_message || "",
    amount: data.bits_used,
    total: data.total_bits_used,
    ...userVars,
  });
};
