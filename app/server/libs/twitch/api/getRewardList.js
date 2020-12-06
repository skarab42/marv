const twitch = require("../index");
const login = require("../login");

module.exports = async function getRewardList() {
  const user = await login();
  const rewards = await twitch.api.helix.channelPoints.getCustomRewards(user);
  return rewards ? rewards.map((reward) => reward._data) : null;
};
