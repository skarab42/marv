const state = require("./state");
const installPlugings = require("./plugins/install");
const getConnectedUser = require("./api/getConnectedUser");

module.exports = async function login() {
  const user = await getConnectedUser();
  state.set("user", user);
  installPlugings();
  return user;
};
