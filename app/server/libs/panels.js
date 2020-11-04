const { panels: store } = require("../../stores");
const { v4: uuid } = require("uuid");
const { _ } = require("./i18next");

const panels = store.get("panels");

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

module.exports = {
  add,
};
