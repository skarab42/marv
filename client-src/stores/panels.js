import gridHelper from "svelte-grid/src/utils/helper";
import { writable, get } from "svelte/store";
import api from "@/api/panels";

export const panels = writable([]);
export const editMode = writable(false);
export const currentPanel = writable(null);
export const itemOptions = writable({ w: 2, h: 2 });
export const gridOptions = writable({
  gap: 4,
  cols: 10,
  rowHeight: 50,
  fillEmpty: false,
  useTransform: true,
  breakpoints: false,
});

let loaded = false;

export function updateEditMode() {
  panels.update((state) => {
    return state.map((panel) => {
      makeGrid(panel);
      return panel;
    });
  });
}

export function setEditMode(enabled = true) {
  editMode.set(enabled);
  updateEditMode();
}

export function toggleEditMode() {
  editMode.update((enabled) => !enabled);
  updateEditMode();
}

export function setCurrentPanel(panel) {
  currentPanel.set(panel);
}

function onAdd(panel, { owner }) {
  panels.update((state) => [...state, panel]);
  if (owner || !get(currentPanel)) {
    setCurrentPanel(panel);
  }
}

function onRemove(panel, pos) {
  panels.update((state) => {
    state = state.filter((p) => p.id !== panel.id);
    if (!state.length) {
      setCurrentPanel(null);
      setEditMode(false);
      return state;
    }

    const cp = get(currentPanel);

    if (cp && cp.id === panel.id) {
      setCurrentPanel(state[pos] || state[pos - 1]);
    }

    return state;
  });
}

function makeGrid(panel) {
  const em = get(editMode);
  const defaults = { static: !em, resizable: em, draggable: em };
  panel.grid = panel.grid.map((item) =>
    gridHelper.item({ ...item, ...defaults })
  );
}

function onUpdate(panel) {
  const cp = get(currentPanel);

  makeGrid(panel);

  panels.update((state) =>
    state.map((p) => (p.id === panel.id ? { ...p, ...panel } : p))
  );

  if (cp && cp.id === panel.id) {
    setCurrentPanel(panel);
  }
}

function loadOnce() {
  if (loaded) return;
  api.on("add", onAdd);
  api.on("remove", onRemove);
  api.on("update", onUpdate);
  loaded = true;
}

export default async function load() {
  const store = await api.getStore();
  store.panels.forEach(makeGrid);
  panels.set(store.panels);
  setCurrentPanel(store.panels[0]); // TODO get from locale storage
  loadOnce();
}
