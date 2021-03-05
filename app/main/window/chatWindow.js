const openLinkInBrowser = require("./openLinkInBrowser");
const { staticPath, watch } = require("../../utils");
const injectTitlebar = require("./injectTitlebar");
const webPreferences = require("./webPreferences");
const { BrowserWindow } = require("electron");
const storeBounds = require("./storeBounds");
const hideOnClose = require("./hideOnClose");
const path = require("path");

let win = null;
let currentChannel = null;

function loadChat(win, channel) {
  if (currentChannel === channel) return;
  win.loadURL(`https://www.twitch.tv/embed/${channel}/chat?parent=localhost`);
  currentChannel = channel;
}

module.exports = function chatWindow({ channel, showOnLoad = true } = {}) {
  if (win) {
    loadChat(win, channel);
    return win.show();
  }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    icon: path.join(staticPath, "icon.png"),
    webPreferences: { ...webPreferences, devTools: watch },
  });

  hideOnClose(win);
  openLinkInBrowser(win);
  storeBounds({ win, name: "chat" });

  win.webContents.on("did-finish-load", async () => {
    await injectTitlebar({ win, title: `${channel} - Twitch chat` });
    showOnLoad && win.show();
  });

  win.removeMenu();
  loadChat(win, channel);
  watch && win.webContents.openDevTools();
};
