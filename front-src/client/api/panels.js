import { on, emit } from "@/libs/socket.io";

export default {
  add: () => emit("panels.add"),
  getStore: () => emit("panels.getAll"),
  set: (panels) => emit("panels.set", panels),
  remove: (panel) => emit("panels.remove", panel),
  update: (panel) => emit("panels.update", panel),
  on: (eventName, callback) => on(`panels.${eventName}`, callback),
  addWidget: (panel, item) => emit("panels.addWidget", panel, item),
  duplicateWidget: (payload) => emit("panels.duplicateWidget", payload),
  moveWidgetToPanel: (payload) => emit("panels.moveWidgetToPanel", payload),
  removeWidget: (panel, widget) => emit("panels.removeWidget", panel, widget),
  removeWidgetComponent: (panel, widget) =>
    emit("panels.removeWidgetComponent", panel, widget),
  exportWidget: (panel, widget) => emit("panels.exportWidget", panel, widget),
  exportPanel: (panel) => emit("panels.exportPanel", panel),
  importArchive: (panel, widget) => emit("panels.importArchive", panel, widget),
  getShortcuts: () => emit("panels.getShortcuts"),
  registerShortcut: (accelerator) =>
    emit("panels.registerShortcut", accelerator),
  unregisterShortcut: (accelerator) =>
    emit("panels.unregisterShortcut", accelerator),
};
