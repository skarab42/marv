const updateFollowsPlugin = require("./updateFollowsPlugin");
const { isFirstStart } = require("../../../../utils");
const streamStatePlugin = require("./streamState");
const followsPlugin = require("./followsPlugin");

module.exports = async function install() {
  if (isFirstStart) {
    await updateFollowsPlugin();
  }
  await streamStatePlugin();
  await followsPlugin();
};
