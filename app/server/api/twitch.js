const settings = require("../libs/settings");
const state = require("../libs/twitch/state");
const twitchLogin = require("../libs/twitch/login");
const pubsubConnect = require("../libs/twitch/pubsub");
const setEvent = require("../libs/twitch/api/setEvent");
const getEvents = require("../libs/twitch/api/getEvents");
const chatConnect = require("../libs/twitch/chat/connect");
const addCommand = require("../libs/twitch/api/addCommand");
const initChatEvents = require("../libs/twitch/chat/events");
const updateReward = require("../libs/twitch/api/updateReward");
const updateCommand = require("../libs/twitch/api/updateCommand");
const removeCommand = require("../libs/twitch/api/removeCommand");
const getRewardList = require("../libs/twitch/api/getRewardList");
const installPlugings = require("../libs/twitch/plugins/install");
const getCommandList = require("../libs/twitch/api/getCommandList");
const getCommandNames = require("../libs/twitch/api/getCommandNames");
const getLastFollowers = require("../libs/twitch/api/getLastFollowers");

module.exports = {
  async login() {
    const user = await twitchLogin();
    Promise.allSettled([
      chatConnect({ channel: user.display_name }),
      pubsubConnect(),
      initChatEvents(),
      installPlugings(),
    ]).catch(() => {
      // console.log("...");
    });
    return user;
  },
  addCommand(command) {
    return addCommand(command).then(({ dataValues }) => {
      this.notify("twitch.addCommand", dataValues);
      return dataValues;
    });
  },
  updateCommand(command) {
    return updateCommand(command).then((result) => {
      this.notify("twitch.updateCommand", command);
      return result;
    });
  },
  removeCommand(command) {
    return removeCommand(command).then((result) => {
      this.notify("twitch.removeCommand", command);
      return result;
    });
  },
  updateReward(reward) {
    return updateReward(reward).then((result) => {
      this.notify("twitch.updateReward", reward);
      return result;
    });
  },
  getEvents: () => getEvents(),
  setEvent: (event) => setEvent(event),
  getRewardList: () => getRewardList(),
  getCommandList: () => getCommandList(),
  getCommandNames: () => getCommandNames(),
  getLastFollowers: () => getLastFollowers(),
  getState: () => state.get(),
  updateState: (state) => state.update(state),
  getSettings: () => settings.getAll("twitch."),
  setSetting: (key, value) => {
    return settings.set(`twitch.${key}`, value);
  },
};
