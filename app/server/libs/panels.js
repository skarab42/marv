const { panels: store } = require("../../stores");
const { v4: uuid } = require("uuid");
const { _ } = require("./i18next");

let panels = store.get("panels");

function name() {
  return `${_("sentences.powers-group")} n°${panels.length + 1}`;
}

function create() {
  return {
    id: uuid(),
    name: name(),
    widgets: [],
  };
}

function add() {
  let panel = create();
  panels.push(panel);
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

module.exports = {
  add,
  remove,
};
