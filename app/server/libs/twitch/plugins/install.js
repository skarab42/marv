const streamStatePlugin = require("./streamState");
const followsPlugin = require("./followsPlugin");

module.exports = function install() {
  streamStatePlugin();
  followsPlugin();
};
