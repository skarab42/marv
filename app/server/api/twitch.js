const stores = require("../../stores");
const state = require("../libs/twitch/state");
const twitchLogin = require("../libs/twitch/login");
const chatJoin = require("../libs/twitch/chat/join");
const chatConnect = require("../libs/twitch/chat/connect");

const banner = "🤖 Marv est dans la place !";

module.exports = {
  login() {
    return twitchLogin().then((user) => {
      chatConnect().then(() => {
        chatJoin(user.display_name).then(({ alreadyJoined } = {}) => {
          if (!alreadyJoined) {
            console.log(banner);
            // twitch.chat.say(user.display_name, banner);
            stores.twitch.set("chatWindow.channel", user.display_name);
          }
        });
      });
      return user;
    });
  },
  getState: () => state.get(),
  getStore: () => stores.twitch.getAll(),
  updateState: (state) => state.update(state),
};
