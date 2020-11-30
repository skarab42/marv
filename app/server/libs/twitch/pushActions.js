const stores = require("../../../stores");
const { push } = require("../actions");

const types = {
  AnimeTimeline: "anime",
};

function isSameCommand(widget, eventProps) {
  return widget.commandName === eventProps.command.name;
}

module.exports = function pushActions(eventName, eventProps) {
  stores.panels.get("panels").forEach(({ widgets }) => {
    widgets.forEach((widget) => {
      if (!widget.component) return;

      const type = types[widget.component.name];

      if (type !== "anime") return;
      if (widget.eventName !== eventName) return;
      if (widget.commandName && !isSameCommand(widget, eventProps)) return;

      push({ type, widget, eventProps });
    });
  });
};
