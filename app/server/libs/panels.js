const getWidgetFiles = require("./files/getWidgetFiles");
const { panels: store } = require("../../stores");
const { filesPath } = require("../../utils");
const cloneDeep = require("clone-deep");
const { humanId } = require("human-id");
const actions = require("./actions");
const { v4: uuid } = require("uuid");
const { _ } = require("./i18next");
const JSZip = require("jszip");
const path = require("path");
const fs = require("fs");

let panels = getAll();

function getAll() {
  return store.get("panels");
}

function name(id) {
  return `${_("sentences.powers-group")} #${id.slice(0, 4)}`;
}

function create(panel = {}) {
  const id = uuid();
  return {
    name: name(id),
    widgets: [],
    grid: [],
    ...panel,
    id,
  };
}

function createWidget(widget = {}) {
  widget && delete widget.id;
  return {
    id: uuid(),
    component: null,
    trigger: "immediat",
    events: [],
    label: null,
    labelSize: 16,
    labelPadding: 8,
    labelPosition: "top",
    labelAlign: "center",
    backgroundColor: "#553C9A",
    backgroundImage: null,
    borders: "rounded",
    ...widget,
  };
}

function add(panel = {}) {
  panel = create(panel);
  panels.push(panel);
  store.set("panels", panels);
  return panel;
}

function set(panels) {
  store.set("panels", panels);
  return panels;
}

function update(panel) {
  panels = panels.map((p) => {
    if (p.id === panel.id) {
      return (panel = { ...p, ...panel });
    }
    return p;
  });
  store.set("panels", panels);
  return panel;
}

function remove(panel) {
  let pos = -1;
  panels = panels.filter((p, i) => {
    if (p.id === panel.id) {
      pos = i;
      panel.widgets.forEach((widget) => {
        actions.remove(widget.id);
      });
      return false;
    }
    return true;
  });
  store.set("panels", panels);
  unregisterShortcut(null);
  return pos;
}

function findPanelById(id) {
  return panels.find((p) => p.id === id);
}

function findWidgetById(panel, id) {
  return panel.widgets.find((w) => w.id === id);
}

function addWidget(panel, item, widget = {}) {
  widget = createWidget(widget);
  const oldPanel = findPanelById(panel.id);
  oldPanel.grid.push({ ...item, id: widget.id });
  oldPanel.widgets.push(widget);
  return { panel: update(oldPanel), widget, item };
}

function duplicateWidget({ panel, widgetId, position }) {
  const oldPanel = findPanelById(panel.id);
  const oldWidget = findWidgetById(panel, widgetId);
  const widget = { ...cloneDeep(oldWidget), id: uuid() };
  const action = actions.get(oldWidget.id);
  if (action) {
    actions.update({ widget, anime: { ...cloneDeep(action), id: uuid() } });
  }
  oldPanel.grid.push({ id: widget.id, ...position });
  oldPanel.widgets.push(widget);
  return { panel: update(oldPanel), widget, item: position };
}

function moveWidgetToPanel({ panel, targetPanel: tp, widgetId, position }) {
  let widget = null;

  let targetPanel = findPanelById(tp.id);
  let sourcePanel = findPanelById(panel.id);

  sourcePanel.grid = sourcePanel.grid.filter((w) => w.id !== widgetId);
  sourcePanel.widgets = sourcePanel.widgets.filter((w) => {
    if (w.id === widgetId) {
      widget = w;
      return false;
    }
    return true;
  });

  targetPanel.grid.push({ id: widget.id, ...position });
  targetPanel.widgets.push(widget);

  const action = actions.get(widgetId);

  if (action) {
    actions.remove(widgetId);
    actions.update({ widget, anime: { ...cloneDeep(action), id: uuid() } });
  }

  return [
    { panel: update(sourcePanel), widget },
    { panel: update(targetPanel), widget },
  ];
}

function removeWidgetComponent(panel, widget) {
  if (!widget.component) return;
  actions.remove(widget.id);
  widget.component = null;
  return { panel: update(panel), widget };
}

function removeWidget(panel, widget) {
  removeWidgetComponent(panel, widget);
  const oldPanel = findPanelById(panel.id);
  oldPanel.grid = oldPanel.grid.filter((w) => w.id !== widget.id);
  oldPanel.widgets = oldPanel.widgets.filter((w) => w.id !== widget.id);
  return { panel: update(oldPanel), widget };
}

function readAssetFile(filename) {
  return fs.readFileSync(path.join(filesPath, filename));
}

async function exportArchive(type, store, files) {
  const zip = new JSZip();
  const filename = `${humanId()}.marv-${type}`;

  zip.file("store.json", JSON.stringify(store));

  files.forEach((filename) =>
    zip.file(`files/${filename}`, readAssetFile(filename))
  );

  const buffer = await zip.generateAsync({ type: "nodebuffer" });
  return { filename, buffer };
}

async function exportPanel(panel) {
  let files = [];
  let panelActions = {};

  panel.widgets.forEach((widget) => {
    const action = actions.get(widget.id);
    action && (panelActions[widget.id] = action);
    files = [...files, ...getWidgetFiles({ widget, action })];
  });

  return await exportArchive("panel", { panel, actions: panelActions }, files);
}

async function exportWidget(panel, widget) {
  const bbox = panel.grid.find((item) => item.id === widget.id);
  const action = actions.get(widget.id);
  const store = { widget, bbox, action };
  const files = getWidgetFiles(store);

  return exportArchive("widget", store, files);
}

async function saveWidgetAsset(relativePath, file) {
  let filepath = path.join(filesPath, relativePath);
  const buffer = await file.async("nodebuffer");
  const renamed = fs.existsSync(filepath);
  const oldPath = relativePath;
  if (renamed) {
    relativePath = `${humanId()}${path.extname(relativePath)}`;
    filepath = path.join(filesPath, relativePath);
  }
  fs.writeFileSync(filepath, buffer);
  return { renamed, oldPath, newPath: relativePath };
}

async function saveZipFiles(files) {
  const promises = [];

  files.forEach((relativePath, file) => {
    promises.push(saveWidgetAsset(relativePath, file));
  });

  return await Promise.all(promises);
}

async function loadArchive(buffer) {
  const jszip = new JSZip();
  const zip = await jszip.loadAsync(buffer);
  const store = await zip.file("store.json").async("string");
  const files = await zip.folder("files");

  return { store: JSON.parse(store), files };
}

function renameWidgetFiles(results, { widget, action }) {
  results.forEach(({ renamed, newPath, oldPath }) => {
    if (!renamed) return;
    if (widget.backgroundImage === oldPath) {
      widget.backgroundImage = newPath;
    }
    if (action) {
      action.items = action.items.map((item) => {
        if (item.target.filename === oldPath) {
          item.target.filename = newPath;
        }
        item.keyframes = item.keyframes.map((keyframe) => ({
          ...keyframe,
          id: uuid(),
        }));
        return { ...item, id: uuid() };
      });
    }
  });
}

async function importWidget(panel, { buffer, position }) {
  const { store, files } = await loadArchive(buffer);
  const results = await saveZipFiles(files);

  renameWidgetFiles(results, store);

  const result = addWidget(panel, position, store.widget);

  if (store.action) {
    actions.update({ widget: result.widget, anime: store.action });
  }

  return { event: "update", ...result };
}

async function importPanel({ buffer }) {
  const { store, files } = await loadArchive(buffer);
  const results = await saveZipFiles(files);
  let panel = add({ name: store.panel.name });

  store.panel.widgets.forEach((widget) => {
    const grid = store.panel.grid.find((item) => item.id === widget.id);
    const action = store.actions[widget.id];

    renameWidgetFiles(results, { widget, action });

    const { x, y, w, h } = grid;
    const result = addWidget(panel, { x, y, w, h }, widget);
    panel = result.panel;

    if (action) {
      action.id = result.widget.id;
      actions.update({ widget: result.widget, anime: action });
    }
  });

  return { event: "add", panel };
}

function importArchive(panel, archive) {
  if (archive.filename.endsWith(".marv-widget")) {
    return importWidget(panel, archive);
  }

  if (archive.filename.endsWith(".marv-panel")) {
    return importPanel(archive);
  }

  return { error: "Unsupported file format" };
}

function getShortcuts() {
  const shortcuts = [];

  const pushEvent = (event) => {
    if (event.shortcutName && !shortcuts.includes(event.shortcutName)) {
      shortcuts.push(event.shortcutName);
    }
  };

  panels.forEach(({ widgets }) => {
    widgets.forEach((widget) => {
      pushEvent(widget);
      if (widget.events) {
        widget.events.forEach((event) => {
          pushEvent(event);
        });
      }
    });
  });

  return shortcuts;
}

let registerShortcutId = null;
let registerShortcutResolve = null;

process.on("message", ({ type, data }) => {
  if (type === "registerGlobalShortcut" && registerShortcutId === data.id) {
    registerShortcutResolve(data);
  }
});

function registerShortcut(accelerator) {
  registerShortcutId = uuid();
  const shortcuts = getShortcuts();
  if (shortcuts.includes(accelerator)) {
    return { id: registerShortcutId, result: true };
  }
  return new Promise((resolve) => {
    registerShortcutResolve = resolve;
    process.send({
      type: "registerShortcut",
      data: { id: registerShortcutId, accelerator },
    });
  });
}

function unregisterShortcut(accelerator) {
  registerShortcutId = uuid();
  process.send({
    type: "unregisterShortcut",
    data: { id: registerShortcutId, accelerator, shortcuts: getShortcuts() },
  });
  return { id: registerShortcutId, result: true };
}

module.exports = {
  add,
  set,
  remove,
  update,
  getAll,
  addWidget,
  exportPanel,
  removeWidget,
  importArchive,
  exportWidget,
  getShortcuts,
  getWidgetFiles,
  duplicateWidget,
  moveWidgetToPanel,
  removeWidgetComponent,
  registerShortcut,
  unregisterShortcut,
};
