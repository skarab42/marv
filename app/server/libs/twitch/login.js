const twitch = require("./index");
const state = require("./state");

async function getStreamByChannel(channel) {
  channel = channel[0] === "#" ? channel.slice(1) : channel;
  const user = await twitch.api.helix.users.getUserByName(channel);
  const stream = await twitch.api.helix.streams.getStreamByUserId(user);
  return stream ? stream._data : null;
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

module.exports = async function login() {
  const user = await twitch.api.helix.users.getMe(true);
  state.update({ user: user._data });
  initTwitchPlugins();
  return user._data;
};
