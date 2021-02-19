import api from "@/api/panels";

export function updateReducer({ id, x, y, w, h }) {
  return { id, x, y, w, h };
}

export function update(panel) {
  return api.update({ ...panel, grid: panel.grid.map(updateReducer) });
}

export function removeWidgetComponent(panel, widget) {
  return api.removeWidgetComponent(panel, widget);
}

export function exportWidget(panel, widget) {
  return api.exportWidget(panel, widget);
}

export function importArchive(panel, widget) {
  return api.importArchive(panel, widget);
}

export function exportPanel(panel) {
  return api.exportPanel(panel);
}

export function getShortcuts() {
  return api.getShortcuts();
}

export function registerShortcut(accelerator) {
  return api.registerShortcut(accelerator);
}

export function unregisterShortcut(accelerator) {
  return api.unregisterShortcut(accelerator);
}
