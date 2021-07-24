const getLastFollows = require("../api/getLastFollows");
const pushActions = require("../pushActions");
const appApi = require("../../../api/app");
const { _ } = require("../../i18next");
const retry = require("../retry");

module.exports = async function followsPlugin({ delay = 0.5 } = {}) {
  try {
    const follows = await retry(getLastFollows);

    follows.forEach((viewer) => {
      pushActions("onFollow", { user: viewer.name });
    });

    setTimeout(followsPlugin, delay * 1000);
  } catch (error) {
    appApi.stateNotify("error", _("errors.unable_to_fetch_new_follows"));
  }
};
