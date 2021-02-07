const twitch = require("../index");
const login = require("../login");

function mapSort(rewards) {
  return rewards.map((reward) => reward._data).sort((a, b) => a.cost - b.cost);
}

module.exports = async function getRewardList() {
  const user = await login();
  const rewards = await twitch.api.helix.channelPoints.getCustomRewards(user);
  return rewards ? mapSort(rewards) : null;
};
