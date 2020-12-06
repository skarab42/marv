const state = require("./state");
const initEvents = require("./initEvents");
const getConnectedUser = require("./api/getConnectedUser");

module.exports = async function login() {
  const user = await getConnectedUser();
  state.set("user", user);
  initEvents();
  return user;
};
