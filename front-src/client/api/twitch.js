import { emit, on } from "@/libs/socket.io";

export default {
  getState: () => emit("twitch.getState"),
  getEventNames: () => emit("twitch.getEventNames"),
  getRewardList: () => emit("twitch.getRewardList"),
  getCommandList: () => emit("twitch.getCommandList"),
  getCommandNames: () => emit("twitch.getCommandNames"),
  getCommandPrefix: () => emit("twitch.getCommandPrefix"),
  getLastFollowers: () => emit("twitch.getLastFollowers"),
  addCommand: (command) => emit("twitch.addCommand", command),
  updateReward: (reward) => emit("twitch.updateReward", reward),
  updateCommand: (command) => emit("twitch.updateCommand", command),
  removeCommand: (command) => emit("twitch.removeCommand", command),
  updateState: (state) => emit("twitch.updateState", state),
  login: (email = false) => emit("twitch.login", email),
  on: (eventName, callback) => on(`twitch.${eventName}`, callback),
  setSetting: (key, value) => emit("twitch.setSetting", key, value),
  getSettings: () => emit("twitch.getSettings"),
};
