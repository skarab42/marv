const twitch = require("../index");

module.exports = async function getRewardList() {
  const user = await twitch.api.helix.users.getMe(true);
  const rewards = await twitch.api.helix.channelPoints.getCustomRewards(user);
  return rewards ? rewards.map((reward) => reward._data) : null;
};
