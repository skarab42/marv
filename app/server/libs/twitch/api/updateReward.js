const twitch = require("../index");

module.exports = async function updateReward({ id, isPaused }) {
  const user = await twitch.api.helix.users.getMe(true);
  const reward = await twitch.api.helix.channelPoints.updateCustomReward(
    user,
    id,
    { isPaused }
  );
  return reward ? reward._data : null;
};
