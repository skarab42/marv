const twitch = require("./index");
const state = require("./state");

async function getStreamByChannel(channel) {
  channel = channel[0] === "#" ? channel.slice(1) : channel;
  const user = await twitch.api.helix.users.getUserByName(channel);
  const { _data } = await twitch.api.helix.streams.getStreamByUserId(user);
  return _data;
}

async function streamStatePlugin() {
  const channel = state.get("user.display_name");
  const stream = await getStreamByChannel(channel);
  state.update({ stream });
  setTimeout(streamStatePlugin, 5000);
}

function initTwitchPlugins() {
  streamStatePlugin();
}

module.exports = function login() {
  return twitch.api.helix.users.getMe(true).then(({ _data: user }) => {
    state.update({ user });
    initTwitchPlugins();
    return user;
  });
};
