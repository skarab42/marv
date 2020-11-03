import { on, emit } from "@/libs/socket.io";

export default {
  connect: () => emit("obs.connect"),
  disconnect: () => emit("obs.disconnect"),
  getState: () => emit("obs.getState"),
  getStore: () => emit("stores.obs", "getAll"),
  emit: (...args) => emit("obs.emit", ...args),
  on: (eventName, callback) => on(`obs.${eventName}`, callback),
};
