const { events } = require("../../stores");
const loggers = require("../libs/loggers");
const settings = require("../libs/settings");
const state = require("../libs/twitch/state");
const twitchLogin = require("../libs/twitch/login");
const chatJoin = require("../libs/twitch/chat/join");
const chatConnect = require("../libs/twitch/chat/connect");
const addCommand = require("../libs/twitch/api/addCommand");
const updateReward = require("../libs/twitch/api/updateReward");
const updateCommand = require("../libs/twitch/api/updateCommand");
const removeCommand = require("../libs/twitch/api/removeCommand");
const getRewardList = require("../libs/twitch/api/getRewardList");
const getCommandList = require("../libs/twitch/api/getCommandList");
const getCommandNames = require("../libs/twitch/api/getCommandNames");
const getLastFollowers = require("../libs/twitch/api/getLastFollowers");

const logger = loggers.get("server");

module.exports = {
  async login() {
    const user = await twitchLogin();
    await chatConnect();
    const join = await chatJoin(user.display_name);

    if (!join.alreadyJoined) {
      logger.info("Chat connected");
      settings.set("twitch.currentChannel", user.display_name);
    }

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
  getEvents: () => events.get("events"),
  setEvent: (event) => {
    events.set(
      "events",
      events.get("events").map((e) => {
        return e.name === event.name ? { ...e, ...event } : e;
      })
    );
  },
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
