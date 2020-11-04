import { writable } from "svelte/store";
import api from "@/libs/panels";

export const panels = writable([]);
export const editMode = writable(false);
export const currentPanel = writable(null);

let loaded = false;

export function toggleEditMode() {
  editMode.update((enabled) => !enabled);
}

export function setCurrentPanel(panel) {
  currentPanel.set(panel);
}

function onAdd(panel, { owner }) {
  panels.update((state) => [...state, panel]);
  owner && setCurrentPanel(panel);
}

function loadOnce() {
  if (loaded) return;
  api.on("add", onAdd);
  loaded = true;
}

export default async function load() {
  const store = await api.getStore();
  panels.set(store.panels);
  setCurrentPanel(store.panels[0]);
  loadOnce();
}
