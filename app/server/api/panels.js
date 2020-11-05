const panels = require("../libs/panels");

module.exports = {
  add() {
    const panel = panels.add();
    this.notify("panels.add", panel);
    return panel;
  },
  addWidget(targetPanel, item) {
    const payload = panels.addWidget(targetPanel, item);
    this.notify("panels.addWidget", payload);
    return payload;
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
