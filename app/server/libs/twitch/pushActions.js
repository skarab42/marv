const stores = require("../../../stores");
const { push } = require("../actions");

const types = {
  AnimeTimeline: "anime",
};

function isInvalidCommand(widget, eventProps) {
  return eventProps.command && widget.commandName !== eventProps.command.name;
}

function isInvalidReward(widget, eventProps) {
  return eventProps.reward && widget.rewardId !== eventProps.reward.id;
}

module.exports = function pushActions(eventName, eventProps) {
  stores.panels.get("panels").forEach(({ widgets }) => {
    widgets.forEach((widget) => {
      if (!widget.component) return;

      const type = types[widget.component.name];

      if (type !== "anime") return;
      if (widget.eventName !== eventName) return;
      if (isInvalidReward(widget, eventProps)) return;
      if (isInvalidCommand(widget, eventProps)) return;

      push({ type, widget, eventProps });
    });
  });
};
