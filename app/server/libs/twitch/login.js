const socket = require("../socket.io");
const twitch = require("./index");
const state = require("./state");

const io = socket();

module.exports = function login() {
  return twitch.api.helix.users.getMe(true).then(({ _data: user }) => {
    io.emit("twitch.login", user);
    state.update({ user });
    return user;
  });
};
