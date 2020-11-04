const panels = require("../libs/panels");

module.exports = {
  add() {
    const panel = panels.add();
    this.notify("panels.add", panel);
    return panel;
  },
  remove(panel) {
    const pos = panels.remove(panel);
    this.notify("panels.remove", panel, pos);
    return panel;
  },
  update(panel) {
    panels.update(panel);
    this.notify("panels.update", panel);
    return panel;
  },
};
