const stores = require("../../stores");
const state = require("../libs/twitch/state");
const twitchLogin = require("../libs/twitch/login");
const chatJoin = require("../libs/twitch/chat/join");
const chatConnect = require("../libs/twitch/chat/connect");
const addCommand = require("../libs/twitch/api/addCommand");
const { eventNames } = require("../libs/twitch/chat/events");
const updateReward = require("../libs/twitch/api/updateReward");
const updateCommand = require("../libs/twitch/api/updateCommand");
const removeCommand = require("../libs/twitch/api/removeCommand");
const getRewardList = require("../libs/twitch/api/getRewardList");
const getCommandList = require("../libs/twitch/api/getCommandList");
const getCommandNames = require("../libs/twitch/api/getCommandNames");
const getCommandPrefix = require("../libs/twitch/api/getCommandPrefix");
const getLastFollowers = require("../libs/twitch/api/getLastFollowers");

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
  addCommand(command) {
    const promise = addCommand(command);
    this.notify("twitch.addCommand", command);
    return promise;
  },
  updateCommand(command) {
    const promise = updateCommand(command);
    this.notify("twitch.updateCommand", command);
    return promise;
  },
  removeCommand(command) {
    const promise = removeCommand(command);
    this.notify("twitch.removeCommand", command);
    return promise;
  },
  updateReward(reward) {
    const promise = updateReward(reward);
    this.notify("twitch.updateReward", reward);
    return promise;
  },
  getEventNames: () => eventNames,
  getRewardList: () => getRewardList(),
  getCommandList: () => getCommandList(),
  getCommandNames: () => getCommandNames(),
  getCommandPrefix: () => getCommandPrefix(),
  getLastFollowers: () => getLastFollowers(),
  getState: () => state.get(),
  getStore: () => stores.twitch.getAll(),
  updateState: (state) => state.update(state),
};
