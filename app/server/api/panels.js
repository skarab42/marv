const panels = require("../libs/panels");

module.exports = {
  add() {
    const panel = panels.add();
    this.notify("panels.add", panel);
    return panel;
  },
};
