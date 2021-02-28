const stores = require("../../../stores");
const jsonLogic = require("./jsonLogic");
const { push } = require("../actions");
const loggers = require("../loggers");

const logger = loggers.get("server");

const types = {
  SceneList: "obs",
  GoToScene: "obs",
  ToggleScene: "obs",
  ToggleAudio: "obs",
  AnimeTimeline: "anime",
};

function isInvalidShortcut(event, eventProps) {
  return (
    eventProps.accelerator && event.shortcutName !== eventProps.accelerator
  );
}

function isInvalidCommand(event, eventProps) {
  return eventProps.command && event.commandName !== eventProps.command.name;
}

function isInvalidReward(event, eventProps) {
  return eventProps.reward && event.rewardId !== eventProps.reward.id;
}

function isInvalidRules(event, eventProps) {
  return (
    event.rules &&
    event.rules.length &&
    !jsonLogic.apply(event.rules[0], eventProps)
  );
}

function getValidEvents(widget, eventName) {
  let events = widget.events.filter((event) => event.eventName === eventName);

  if (widget.eventName === eventName) {
    events.push(widget);
  }

  return events;
}

module.exports = function pushActions(eventName, eventProps) {
  logger.debug("pushActions", { eventName, eventProps });

  stores.panels.get("panels").forEach(({ widgets }) => {
    widgets.forEach((widget) => {
      if (!widget.component) return;

      const type = types[widget.component.name];

      if (!["anime", "obs"].includes(type)) return;

      getValidEvents(widget, eventName).forEach((event) => {
        if (isInvalidReward(event, eventProps)) return;
        if (isInvalidCommand(event, eventProps)) return;
        if (isInvalidShortcut(event, eventProps)) return;
        if (isInvalidRules(event, eventProps)) return;

        push({ type, widget, event, eventProps });
      });
    });
  });
};
