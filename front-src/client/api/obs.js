import { on, emit } from "@/libs/socket.io";

export default {
  connect: () => emit("obs.connect"),
  disconnect: () => emit("obs.disconnect"),
  getState: () => emit("obs.getState"),
  emit: (...args) => emit("obs.emit", ...args),
  getSettings: () => emit("obs.getSettings"),
  setSetting: (key, value) => emit("obs.setSetting", key, value),
  on: (eventName, callback) => on(`obs.${eventName}`, callback),
};
