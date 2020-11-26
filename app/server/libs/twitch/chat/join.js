const state = require("../state");
const { chat } = require("../index");

module.exports = function join(channel) {
  const joinedChannels = state.get("chat.joinedChannels");

  if (joinedChannels.includes(channel)) {
    return Promise.resolve({ alreadyJoined: true });
  }

  joinedChannels.push(channel);

  return chat.join(channel).catch((error) => {
    state.set("chat.joinedChannels", [...new Set(joinedChannels)]);
    return Promise.reject(error);
  });
};
