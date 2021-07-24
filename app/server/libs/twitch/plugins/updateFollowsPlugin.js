const Viewer = require("../../../db/Models/Viewer");
const getFollows = require("../api/getFollows");
const appApi = require("../../../api/app");
const { _ } = require("../../i18next");
const retry = require("../retry");

module.exports = async function updateFollowsPlugin() {
  const all = await Viewer.findAll();
  if (all.length) return;

  try {
    await retry(getFollows);
  } catch (error) {
    appApi.stateNotify("error", _("errors.unable_to_fetch_all_follows"));
  }
};
