const updateFollowsPlugin = require("./updateFollowsPlugin");
const streamStatePlugin = require("./streamState");
const followsPlugin = require("./followsPlugin");

let installLock = false;

module.exports = async function install() {
  if (installLock) return;

  installLock = true;

  await updateFollowsPlugin();
  streamStatePlugin();
  followsPlugin();
};
