const { panels: store } = require("../../stores");
const actions = require("./actions");
const { v4: uuid } = require("uuid");
const { _ } = require("./i18next");

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

function addWidget(panel, item) {
  let widget = createWidget();
  const oldPanel = findPanelById(panel.id);
  oldPanel.grid.push({ id: widget.id, ...item });
  oldPanel.widgets.push(widget);
  return { panel: update(oldPanel), widget, item };
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

module.exports = {
  add,
  remove,
  update,
  getAll,
  addWidget,
  removeWidget,
  removeWidgetComponent,
};
