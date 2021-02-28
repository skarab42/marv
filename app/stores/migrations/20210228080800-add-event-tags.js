const { events: store } = require("../index");

module.exports = {
  up: async () => {
    store.set(
      "events",
      store.get("events").map((event) => {
        if (event.name === "onCommand") {
          event.tags = { user: "user" };
        }
        return event;
      })
    );
  },
  down: async () => {},
};
