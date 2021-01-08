const pushActions = require("../pushActions");

module.exports = async function onBits(message) {
  const data = message._data.data;

  pushActions("onBits", {
    user: data.is_anonymous ? "Anonymous" : data.user_name,
    message: data.chat_message || "",
    amount: data.bits_used,
    total: data.total_bits_used,
  });
};
