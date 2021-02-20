const { panels: store } = require("../index");

function clean(widget) {
  delete widget.eventName;
  delete widget.commandName;
  delete widget.rewardId;
  delete widget.shortcutName;
}

module.exports = {
  up: async () => {
    const panels = store.get("panels");

    panels.forEach((panel) => {
      panel.widgets.forEach((widget) => {
        widget.events = widget.events || [];

        const event = {};

        if (!widget.eventName || widget.eventName === "none") {
          clean(widget);
          return;
        }

        event.eventName = widget.eventName;

        if (event.eventName === "onCommand") {
          event.commandName = widget.commandName;
        } else if (event.eventName === "onRedemption") {
          event.rewardId = widget.rewardId;
        } else if (event.eventName === "onShortcut") {
          event.shortcutName = widget.shortcutName;
        }

        if (Object.keys(event).length) {
          widget.events.push(event);
        }

        clean(widget);
      });
    });

    store.set("panels", panels);
  },
  down: async () => {},
};
