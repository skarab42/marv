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
  };
}

function createWidget() {
  return {
    id: uuid(),
    state: { w: 2, h: 2 },
    props: {
      label: null,
      labelSize: 16,
      labelPadding: 8,
      labelPosition: "text-center",
      classList: "rounded-md",
      backgroundColor: "#8fa2b5",
      backgroundImage: null,
      component: null,
    },
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

function addWidget(panel) {
  let widget = createWidget();
  const oldPanel = panels.find((p) => p.id === panel.id);
  oldPanel.widgets.push(widget);
  const newPanel = update(oldPanel);
  console.log(newPanel.widgets.length);
  return { panel: newPanel, widget };
}

module.exports = {
  add,
  remove,
  update,
  addWidget,
};
