const twitch = require("../libs/twitch");

module.exports = {
  getMe(email = false) {
    return twitch.api.helix.users.getMe(email).then(({ _data: user }) => {
      this.notify("twitch.getMe", user);
      twitch.state.update({ user });
      return Promise.resolve(user);
    });
  },
  getState: () => twitch.state.get(),
  updateState: (state) => twitch.state.update(state),
};
