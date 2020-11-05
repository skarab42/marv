const { panels: store } = require("../../stores");
const { v4: uuid } = require("uuid");
const { _ } = require("./i18next");

let panels = store.get("panels");

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
    label: null,
    labelSize: 16,
    labelPadding: 8,
    labelPosition: "center",
    backgroundColor: "#553C9A",
    backgroundImage: null,
    classList: "rounded",
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
      return false;
    }
    return true;
  });
  store.set("panels", panels);
  return pos;
}

function addWidget(panel, item) {
  let widget = createWidget();
  const oldPanel = panels.find((p) => p.id === panel.id);
  oldPanel.widgets.push(widget);
  oldPanel.grid.push({ id: widget.id, ...item });
  return { panel: update(oldPanel), widget, item };
}

module.exports = {
  add,
  remove,
  update,
  addWidget,
};
