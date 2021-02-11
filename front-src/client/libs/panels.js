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

export function exportWidget(widget) {
  return api.exportWidget(widget);
}
