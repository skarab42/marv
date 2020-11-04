import { writable } from "svelte/store";
import { _ } from "@/libs/i18next";
import { v4 as uuid } from "uuid";

export const panels = writable([]);
export const editMode = writable(false);
export const currentPanel = writable(null);

export function select(panel) {
  currentPanel.set(panel);
}

export function toggleEditMode() {
  editMode.update((enabled) => !enabled);
}

export function create(length) {
  return {
    id: uuid(),
    name: `${_("sentences.powers-group")} n°${length + 1}`,
    widgets: [],
  };
}

export function add() {
  let panel = null;
  panels.update((state) => {
    panel = create(state.length);
    return [...state, panel];
  });
  return panel;
}
