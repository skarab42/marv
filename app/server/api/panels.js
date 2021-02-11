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
  duplicateWidget(payload) {
    const result = panels.duplicateWidget(payload);
    this.notify("panels.addWidget", result);
    this.notify("panels.update", result.panel);
    return result;
  },
  moveWidgetToPanel(payload) {
    const results = panels.moveWidgetToPanel(payload);
    this.notify("panels.update", results[0].panel);
    this.notify("panels.update", results[1].panel);
    return results;
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
  exportWidget(panel, widget) {
    return panels.exportWidget(panel, widget);
  },
  async importArchive(panel, widget) {
    const payload = await panels.importArchive(panel, widget);
    this.notify("panels.update", payload.panel);
    return payload;
  },
};
