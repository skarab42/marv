const twitch = require("../index");

module.exports = async function getConnectedUser() {
  const user = await twitch.api.helix.users.getMe(true);
  return user ? user._data : null;
};
