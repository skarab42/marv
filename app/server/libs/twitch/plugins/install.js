const updateFollowsPlugin = require("./updateFollowsPlugin");
const streamStatePlugin = require("./streamState");
const followsPlugin = require("./followsPlugin");
const appApi = require("../../../api/app");
const { _ } = require("../../i18next");

let installLock = false;

module.exports = async function install() {
  if (installLock) return;

  installLock = true;

  try {
    await updateFollowsPlugin();
  } catch (error) {
    appApi.stateNotify("error", _("errors.unable_to_fetch_follows"));
  }

  streamStatePlugin();
  followsPlugin();
};
