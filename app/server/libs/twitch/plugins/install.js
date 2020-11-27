const updateFollowsPlugin = require("./updateFollowsPlugin");
const { isFirstStart } = require("../../../../utils");
const streamStatePlugin = require("./streamState");
const followsPlugin = require("./followsPlugin");

let lock = false;

module.exports = function install() {
  if (isFirstStart && !lock) {
    updateFollowsPlugin();
    lock = true;
  }
  streamStatePlugin();
  followsPlugin();
};
