import { emit, on } from "@/libs/socket.io";

export default {
  getState: () => emit("twitch.getState"),
  updateState: (state) => emit("twitch.updateState", state),
  login: (email = false) => emit("twitch.login", email),
  on: (eventName, callback) => on(`twitch.${eventName}`, callback),
};
