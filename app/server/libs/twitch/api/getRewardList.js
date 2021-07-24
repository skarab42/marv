const appApi = require("../../../api/app");
const { _ } = require("../../i18next");
const twitch = require("../index");
const login = require("../login");
const retry = require("../retry");

function mapSort(rewards) {
  return rewards.map((reward) => reward._data).sort((a, b) => a.cost - b.cost);
}

async function _getRewardList() {
  const user = await login();
  const rewards = await twitch.api.helix.channelPoints.getCustomRewards(user);
  return rewards ? mapSort(rewards) : null;
}

module.exports = async function getRewardList() {
  try {
    return await retry(_getRewardList);
  } catch (error) {
    appApi.stateNotify("error", _("errors.unable_to_fetch_rewards_list"));
    return [];
  }
};
