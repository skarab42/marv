const pushActions = require("./libs/twitch/pushActions");
const { getShortcuts } = require("./libs/panels");

process.send({ type: "start", data: { shortcuts: getShortcuts() } });

process.on("message", (event) => {
  if (event.type === "shortcut") {
    pushActions("onShortcut", event);
  }
});
