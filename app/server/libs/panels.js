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

function createWidget() {
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

function addWidget(panel, item) {
  let widget = createWidget();
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

async function exportWidget(widget) {
  const filename = `${humanId()}.marv-widget`;
  const action = await actions.get(widget.id);
  const json = JSON.stringify({ widget, action });
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

module.exports = {
  add,
  set,
  remove,
  update,
  getAll,
  addWidget,
  removeWidget,
  exportWidget,
  duplicateWidget,
  moveWidgetToPanel,
  removeWidgetComponent,
};
