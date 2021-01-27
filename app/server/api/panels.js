const panels = require("../libs/panels");

module.exports = {
  getAll: () => panels.getAll(),
  add() {
    const panel = panels.add();
    this.notify("panels.add", panel);
    return panel;
  },
  set(newPanels) {
    const results = panels.set(newPanels);
    this.notify("panels.set", newPanels);
    return results;
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
  addWidget(targetPanel, item) {
    const payload = panels.addWidget(targetPanel, item);
    this.notify("panels.addWidget", payload);
    this.notify("panels.update", payload.panel);
    return payload;
  },
  removeWidget(targetPanel, widget) {
    const payload = panels.removeWidget(targetPanel, widget);
    this.notify("panels.removeWidget", payload);
    this.notify("panels.update", payload.panel);
    return payload;
  },
  removeWidgetComponent(panel, widget) {
    const payload = panels.removeWidgetComponent(panel, widget);
    this.notify("panels.update", payload.panel);
    return payload;
  },
};
