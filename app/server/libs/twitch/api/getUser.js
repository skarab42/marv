const twitch = require("../index");

module.exports = async function getUser(channel) {
  return await twitch.api.helix.users.getUserByName(channel);
};
