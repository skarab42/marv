import { emit, on } from "@/libs/socket.io";

export default {
  getState: () => emit("twitch.getState"),
  updateState: (state) => emit("twitch.updateState", state),
  getMe: (email = false) => emit("twitch.getMe", email),
  on: (eventName, callback) => on(`twitch.${eventName}`, callback),
};
