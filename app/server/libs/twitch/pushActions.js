const stores = require("../../../stores");
const { push } = require("../actions");

const types = {
  AnimeTimeline: "anime",
};

module.exports = function pushActions(eventName, eventProps) {
  stores.panels.get("panels").forEach(({ widgets }) => {
    widgets.forEach((widget) => {
      if (!widget.component) return;

      const type = types[widget.component.name];

      if (type === "anime" && widget.eventName === eventName) {
        push({ type, widget, eventProps });
      }
    });
  });
};
