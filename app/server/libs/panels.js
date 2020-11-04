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
