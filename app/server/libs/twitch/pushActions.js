const stores = require("../../../stores");
const { push } = require("../actions");
const loggers = require("../loggers");

const logger = loggers.get("server");

const types = {
  SceneList: "obs",
  GoToScene: "obs",
  ToggleScene: "obs",
  AnimeTimeline: "anime",
};

function isInvalidShortcut(widget, eventProps) {
  return (
    eventProps.accelerator && widget.shortcutName !== eventProps.accelerator
  );
}

function isInvalidCommand(widget, eventProps) {
  return eventProps.command && widget.commandName !== eventProps.command.name;
}

function isInvalidReward(widget, eventProps) {
  return eventProps.reward && widget.rewardId !== eventProps.reward.id;
}

module.exports = function pushActions(eventName, eventProps) {
  logger.debug("pushActions", { eventName, eventProps });

  stores.panels.get("panels").forEach(({ widgets }) => {
    widgets.forEach((widget) => {
      if (!widget.component) return;

      const type = types[widget.component.name];

      if (!["anime", "obs"].includes(type)) return;
      if (widget.eventName !== eventName) return;
      if (isInvalidReward(widget, eventProps)) return;
      if (isInvalidCommand(widget, eventProps)) return;
      if (isInvalidShortcut(widget, eventProps)) return;

      push({ type, widget, eventProps });
    });
  });
};
