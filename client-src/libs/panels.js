import { on, emit } from "@/libs/socket.io";

export default {
  add: () => emit("panels.add"),
  getStore: () => emit("stores.panels", "getAll"),
  on: (eventName, callback) => on(`panels.${eventName}`, callback),
};
