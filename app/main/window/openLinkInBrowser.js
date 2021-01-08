const open = require("open");

module.exports = function openLinkInBrowser(win) {
  win.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    open(url);
  });
};
