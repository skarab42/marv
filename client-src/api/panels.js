import { on, emit } from "@/libs/socket.io";

export default {
  add: () => emit("panels.add"),
  remove: (panel) => emit("panels.remove", panel),
  update: (panel) => emit("panels.update", panel),
  getStore: () => emit("stores.panels", "getAll"),
  on: (eventName, callback) => on(`panels.${eventName}`, callback),
  addWidget: (panel, item) => emit("panels.addWidget", panel, item),
  removeWidget: (panel, widget) => emit("panels.removeWidget", panel, widget),
};
