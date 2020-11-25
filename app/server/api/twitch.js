const stores = require("../../stores");
const twitch = require("../libs/twitch");
const chatJoin = require("../libs/twitch/chatJoin");
const chatConnect = require("../libs/twitch/chatConnect");

module.exports = {
  login() {
    return twitch.api.helix.users.getMe(true).then(({ _data: user }) => {
      this.notify("twitch.login", user);
      twitch.state.update({ user });
      chatConnect().then(() => {
        chatJoin(user.display_name).then(({ alreadyJoined } = {}) => {
          if (!alreadyJoined) {
            console.log("Marv est dans la place !");
            stores.twitch.set("chatWindow.channel", user.display_name);
            twitch.chat.say(user.display_name, "Marv est dans la place !");
          }
        });
      });
      return Promise.resolve(user);
    });
  },
  getState: () => twitch.state.get(),
  getStore: () => stores.twitch.getAll(),
  updateState: (state) => twitch.state.update(state),
};
