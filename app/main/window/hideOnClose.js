const { app } = require("electron");
const quit = require("../quit");

module.exports = function hideOnClose(win) {
  let willQuitApp = false;

  win.on("close", (event) => {
    // Quit on Cmd + Q on Mac
    if (willQuitApp && process.platform === "darwin") {
      quit();
    }

    if (!app.__isQuitting) {
      event.preventDefault();
      win.hide();
    }
  });

  // Detect If the user decide to quit app
  app.on("before-quit", () => (willQuitApp = true));
};
