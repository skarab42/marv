const twitch = require("../index");

module.exports = async function getStreamByChannel(channel) {
  channel = channel[0] === "#" ? channel.slice(1) : channel;
  const user = await twitch.api.helix.users.getUserByName(channel);
  const stream = await twitch.api.helix.streams.getStreamByUserId(user);
  return stream ? stream._data : null;
};
