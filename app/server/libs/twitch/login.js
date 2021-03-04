const state = require("./state");
const getConnectedUser = require("./api/getConnectedUser");

let user = null;

module.exports = async function login() {
  if (user && user.display_name) return user;

  user = await getConnectedUser();
  state.set("user", user);

  return user;
};
