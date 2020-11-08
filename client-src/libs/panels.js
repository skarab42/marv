import api from "@/api/panels";

function updateReducer({ id, x, y, w, h }) {
  return { id, x, y, w, h };
}

function update(panel) {
  return api.update({ ...panel, grid: panel.grid.map(updateReducer) });
}

export { update };
