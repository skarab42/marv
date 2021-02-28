const { events } = require("../../../../stores");

module.exports = function setEvent(event) {
  events.set(
    "events",
    events.get("events").map((e) => {
      return e.name === event.name ? { ...e, ...event } : e;
    })
  );
};
