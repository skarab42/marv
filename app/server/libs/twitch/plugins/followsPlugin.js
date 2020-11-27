const getLastFollows = require("../api/getLastFollows");
const stores = require("../../../../stores");
const { push } = require("../../actions");

const types = {
  AnimeTimeline: "anime",
};

function pushActions(eventProps) {
  stores.panels.get("panels").forEach(({ widgets }) => {
    widgets.forEach((widget) => {
      if (!widget.component) return;

      const type = types[widget.component.name];

      if (type === "anime" && widget.eventName === "follow") {
        push({ type, widget, eventProps });
      }
    });
  });
}

module.exports = async function streamStatePlugin({ delay = 2 } = {}) {
  const follows = await getLastFollows();

  follows.forEach((viewer) => {
    pushActions({ user: viewer.name });
  });

  if (follows.length) {
    console.log("New follows:", follows.length);
  }

  setTimeout(streamStatePlugin, delay * 1000);
};
