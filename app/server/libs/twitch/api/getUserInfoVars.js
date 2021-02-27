const getConnectedUser = require("./getConnectedUser");
const twitch = require("../index");

function getDefaultVars() {
  return {
    isBroadcaster: "0",
    isMod: "0",
    isSubscriber: "0",
    isVip: "0",
    timestamp: Date.now(),
  };
}

function getChatUserInfoVars(data) {
  const { isBroadcaster, isMod, isSubscriber, isVip } = data.userInfo;

  return {
    ...getDefaultVars(),
    isBroadcaster,
    isMod,
    isSubscriber,
    isVip,
  };
}

async function getPubSubUserInfoVars(user) {
  const broadcaster = await getConnectedUser();
  const isBroadcaster = broadcaster.login === user.login;

  const isSubscriber =
    isBroadcaster ||
    !!(await twitch.api.helix.subscriptions.getSubscriptionForUser(
      broadcaster.id,
      user.id
    ));

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
    isSubscriber,
    isVip,
  };
}

module.exports = {
  getDefaultVars,
  getChatUserInfoVars,
  getPubSubUserInfoVars,
};
