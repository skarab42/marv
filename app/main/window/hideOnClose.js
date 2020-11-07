const { app } = require("electron");

module.exports = function hideOnClose(win) {
  win.on("close", event => {
    if (!app.__isQuitting) {
      event.preventDefault();
      win.hide();
    }
  });
};
