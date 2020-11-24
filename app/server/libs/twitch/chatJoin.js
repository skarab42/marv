const state = require("./state");
const { chat } = require("./index");

module.exports = function chatJoin(channel) {
  const joinedChannels = state.get("chat.joinedChannels");

  if (joinedChannels.includes(channel)) {
    return Promise.resolve({ alreadyJoined: true });
  }

  joinedChannels.push(channel);

  return chat.join(channel).catch((error) => {
    state.set(
      "chat.joinedChannels",
      joinedChannels.filter((c) => c !== channel)
    );
    return Promise.reject(error);
  });
};
