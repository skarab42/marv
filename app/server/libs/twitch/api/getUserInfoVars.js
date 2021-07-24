const getConnectedUser = require("./getConnectedUser");
const appApi = require("../../../api/app");
const { _ } = require("../../i18next");
const twitch = require("../index");
const retry = require("../retry");

function getDefaultVars() {
  return {
    isBroadcaster: "0",
    isMod: "0",
    isVip: "0",
    isSubscriber: "0",
    // timestamp: Date.now(),
  };
}

function getChatUserInfoVars(data) {
  const { isBroadcaster, isMod, isSubscriber, isVip } = data.userInfo;

  return {
    ...getDefaultVars(),
    isBroadcaster,
    isMod,
    isVip,
    isSubscriber,
  };
}

async function isSub(from, to) {
  return !!(await twitch.api.helix.subscriptions.getSubscriptionForUser(
    from,
    to
  ));
}

async function getPubSubUserInfoVars(user) {
  const broadcaster = await getConnectedUser();
  const isBroadcaster = broadcaster.login === user.login;
  let isSubscriber = false;

  try {
    isSubscriber =
      isBroadcaster || (await retry(() => isSub(broadcaster.id, user.id)));
  } catch (error) {
    appApi.stateNotify("error", _("errors.unable_to_fetch_sub_state"));
  }

  let isMod = false;
  let isVip = false;

  if (!isBroadcaster) {
    const mods = await twitch.chat.getMods(broadcaster.login);
    const vips = await twitch.chat.getVips(broadcaster.login);
    isMod = mods.includes(user.login);
    isVip = vips.includes(user.login);
  }

  return {
    ...getDefaultVars(),
    isBroadcaster,
    isMod,
    isVip,
    isSubscriber,
  };
}

module.exports = {
  getDefaultVars,
  getChatUserInfoVars,
  getPubSubUserInfoVars,
};
