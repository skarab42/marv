const state = require("./state");
const initEvents = require("./initEvents");
const getConnectedUser = require("./api/getConnectedUser");

let user = null;

module.exports = async function login() {
  if (user) return user;

  user = await getConnectedUser();

  state.set("user", user);
  initEvents();

  return user;
};
