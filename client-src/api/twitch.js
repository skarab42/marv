import { emit, on } from "@/libs/socket.io";

export default {
  getState: () => emit("twitch.getState"),
  getStore: () => emit("twitch.getStore"),
  updateState: (state) => emit("twitch.updateState", state),
  login: (email = false) => emit("twitch.login", email),
  set: (key, val) => emit("stores.twitch", "set", key, val),
  on: (eventName, callback) => on(`twitch.${eventName}`, callback),
};
