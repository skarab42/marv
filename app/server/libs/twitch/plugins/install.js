const updateFollowsPlugin = require("./updateFollowsPlugin");
const { isFirstStart } = require("../../../../utils");
const streamStatePlugin = require("./streamState");
const followsPlugin = require("./followsPlugin");

let installLock = false;

module.exports = async function install() {
  if (installLock) return;

  installLock = true;

  if (isFirstStart) {
    await updateFollowsPlugin();
  }

  streamStatePlugin();
  followsPlugin();
};
