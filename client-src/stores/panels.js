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

export function setEditMode(enabled = true) {
  editMode.set(enabled);
}

export function toggleEditMode() {
  editMode.update((enabled) => !enabled);
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

function onUpdate(panel) {
  panels.update((state) =>
    state.map((p) => (p.id === panel.id ? { ...p, ...panel } : p))
  );
}

function onAddWidget({ panel }, { owner }) {
  onUpdate(panel);
  owner && setCurrentPanel(panel);
}

function loadOnce() {
  if (loaded) return;
  api.on("add", onAdd);
  api.on("remove", onRemove);
  api.on("update", onUpdate);
  api.on("addWidget", onAddWidget);
  loaded = true;
}

export default async function load() {
  const store = await api.getStore();
  panels.set(store.panels);
  setCurrentPanel(store.panels[0]); // TODO get from locale storage
  loadOnce();
}
