import { on, emit } from "@/libs/socket.io";

export default {
  add: () => emit("panels.add"),
  remove: (panel) => emit("panels.remove", panel),
  update: (panel) => emit("panels.update", panel),
  getStore: () => emit("stores.panels", "getAll"),
  addWidget: (panel) => emit("panels.addWidget", panel),
  on: (eventName, callback) => on(`panels.${eventName}`, callback),
};
