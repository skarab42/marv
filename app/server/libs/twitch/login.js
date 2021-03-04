const state = require("./state");
const getConnectedUser = require("./api/getConnectedUser");

let user = null;

module.exports = async function login() {
  if (user) return user;

  user = await getConnectedUser();
  state.set("user", user);

  return user;
};
