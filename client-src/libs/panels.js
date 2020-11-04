import { on, emit } from "@/libs/socket.io";

export default {
  add: () => emit("panels.add"),
  remove: (panel) => emit("panels.remove", panel),
  getStore: () => emit("stores.panels", "getAll"),
  on: (eventName, callback) => on(`panels.${eventName}`, callback),
};
