import { writable } from "svelte/store";
import api from "@/libs/panels";

export const panels = writable([]);
export const editMode = writable(false);
export const currentPanel = writable(null);

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

function onAdd(panel) {
  panels.update((state) => [...state, panel]);
}

function onRemove(panel) {
  panels.update((state) => state.filter((p) => p.id !== panel.id));
}

function loadOnce() {
  if (loaded) return;
  api.on("add", onAdd);
  api.on("remove", onRemove);
  loaded = true;
}

export default async function load() {
  const store = await api.getStore();
  panels.set(store.panels);
  setCurrentPanel(store.panels[0]);
  loadOnce();
}
