import gridHelper from "svelte-grid/src/utils/helper";
import { writable, get } from "svelte/store";
import api from "@/api/panels";

export const panels = writable([]);
export const editMode = writable(false);
export const currentPanel = writable(null);
export const selectedWidget = writable(null);
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

export function setPanels(newPanels) {
  panels.set(newPanels);
  api.set(newPanels);
}

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
  localStorage.setItem("currentPanel", panel && panel.id);
}

export function findSpaceForWidget(panel, props = {}) {
  const cols = get(gridOptions).cols;
  const item = { ...gridHelper.item(get(itemOptions)), ...props };
  const pos = gridHelper.findSpaceForItem(item, panel.grid, cols);
  return { w: item.w, h: item.h, ...pos };
}

export async function addWidget() {
  const panel = get(currentPanel);
  await api.addWidget(panel, findSpaceForWidget(panel));
  setEditMode(true);
}

export async function duplicateWidget({ panel, item }) {
  const position = findSpaceForWidget(panel, { w: item.w, h: item.h });
  const res = await api.duplicateWidget({ panel, widgetId: item.id, position });
  setEditMode(true);
  return res;
}

export async function moveWidgetToPanel({ panel, targetPanel, item }) {
  const position = findSpaceForWidget(targetPanel, { w: item.w, h: item.h });
  await api.moveWidgetToPanel({
    panel,
    targetPanel,
    widgetId: item.id,
    position,
  });
  setEditMode(true);
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

function onSet(newPanels) {
  panels.set(newPanels);
}

function loadOnce() {
  if (loaded) return;
  api.on("add", onAdd);
  api.on("set", onSet);
  api.on("remove", onRemove);
  api.on("update", onUpdate);
  loaded = true;
}

export default async function load() {
  const store = await api.getStore();
  store.forEach(makeGrid);
  panels.set(store);
  const panelId = localStorage.getItem("currentPanel");
  const panel = store.find((panel) => panel.id === panelId);
  setCurrentPanel(panel || store[0]);
  loadOnce();
}
