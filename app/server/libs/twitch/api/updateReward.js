const twitch = require("../index");
const login = require("../login");

module.exports = async function updateReward({ id, isPaused }) {
  const user = await login();
  const reward = await twitch.api.helix.channelPoints.updateCustomReward(
    user,
    id,
    { isPaused }
  );
  return reward ? reward._data : null;
};
