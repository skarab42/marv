const state = require("./state");
const getConnectedUser = require("./api/getConnectedUser");
const streamStatePlugin = require("./plugins/streamState");

function initTwitchPlugins() {
  streamStatePlugin();
}

module.exports = async function login() {
  const user = await getConnectedUser();
  state.set("user", user);
  initTwitchPlugins();
  return user;
};
