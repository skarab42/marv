const stores = require("../../stores");
const twitch = require("../libs/twitch");
const twitchLogin = require("../libs/twitch/login");
const chatJoin = require("../libs/twitch/chatJoin");
const chatConnect = require("../libs/twitch/chatConnect");

const banner = "🤖 Marv est dans la place !";

module.exports = {
  login() {
    return twitchLogin().then((user) => {
      chatConnect().then(() => {
        chatJoin(user.display_name).then(({ alreadyJoined } = {}) => {
          if (!alreadyJoined) {
            console.log(banner);
            twitch.chat.say(user.display_name, banner);
            stores.twitch.set("chatWindow.channel", user.display_name);
          }
        });
      });
      return user;
    });
  },
  getState: () => twitch.state.get(),
  getStore: () => stores.twitch.getAll(),
  updateState: (state) => twitch.state.update(state),
};
