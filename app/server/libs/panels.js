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

function create() {
  const id = uuid();
  return {
    id,
    name: name(id),
    widgets: [],
    grid: [],
  };
}

function createWidget(widget = {}) {
  widget && delete widget.id;
  return {
    id: uuid(),
    component: null,
    trigger: "immediat",
    eventName: "none",
    commandName: "none",
    rewardId: "none",
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

function add() {
  let panel = create();
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
  oldPanel.grid.push({ id: widget.id, ...item });
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

async function exportWidget(panel, widget) {
  const filename = `${humanId()}.marv-widget`;
  const action = await actions.get(widget.id);
  const bbox = panel.grid.find((item) => item.id === widget.id);
  const json = JSON.stringify({ widget, bbox, action });
  const zip = new JSZip();

  zip.file("store.json", json);

  const addFile = (filename) =>
    zip.file(`files/${filename}`, readAssetFile(filename));

  if (widget.backgroundImage) {
    addFile(widget.backgroundImage);
  }

  if (action) {
    action.items.forEach(({ target }) => {
      addFile(target.filename);
    });
  }

  const buffer = await zip.generateAsync({ type: "nodebuffer" });

  return { filename, buffer };
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

async function importWidget(panel, { buffer, position }) {
  const jszip = new JSZip();
  const zip = await jszip.loadAsync(buffer);
  const store = await zip.file("store.json").async("string");
  const files = await zip.folder("files");

  const results = await saveZipFiles(files);
  const { widget, action } = JSON.parse(store);

  results.forEach(({ renamed, newPath, oldPath }) => {
    if (!renamed) return;
    if (widget.backgroundImage === oldPath) {
      widget.backgroundImage = newPath;
    }
    if (action) {
      action.items.forEach(({ target }) => {
        if (target.filename === oldPath) {
          target.filename = newPath;
        }
      });
    }
  });

  const result = addWidget(panel, position, widget);
  action && actions.update({ widget: result.widget, anime: action });

  return result;
}

function importArchive(panel, archive) {
  if (archive.filename.endsWith(".marv-widget")) {
    return importWidget(panel, archive);
  }

  return { error: "Unsupported file format" };
}

module.exports = {
  add,
  set,
  remove,
  update,
  getAll,
  addWidget,
  removeWidget,
  importArchive,
  exportWidget,
  duplicateWidget,
  moveWidgetToPanel,
  removeWidgetComponent,
};
