import { on, emit } from "@/libs/socket.io";

export default {
  add: () => emit("panels.add"),
  getStore: () => emit("panels.getAll"),
  set: (panels) => emit("panels.set", panels),
  remove: (panel) => emit("panels.remove", panel),
  update: (panel) => emit("panels.update", panel),
  on: (eventName, callback) => on(`panels.${eventName}`, callback),
  addWidget: (panel, item) => emit("panels.addWidget", panel, item),
  removeWidget: (panel, widget) => emit("panels.removeWidget", panel, widget),
  removeWidgetComponent: (panel, widget) =>
    emit("panels.removeWidgetComponent", panel, widget),
};
