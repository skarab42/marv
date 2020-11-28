const openLinkInBrowser = require("./openLinkInBrowser");
const { staticPath, watch } = require("../../utils");
const webPreferences = require("./webPreferences");
const { BrowserWindow } = require("electron");
const storeBounds = require("./storeBounds");
const hideOnClose = require("./hideOnClose");
const stores = require("../../stores");
const path = require("path");

const { host, port } = stores.server.getAll();

let win = null;

module.exports = function createWindow({ showOnLoad = true } = {}) {
  if (win) {
    return win.show();
  }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    frame: false,
    icon: path.join(staticPath, "icon.png"),
    webPreferences: { ...webPreferences, devTools: watch },
  });

  hideOnClose(win);
  openLinkInBrowser(win);
  storeBounds({ win, name: "main" });

  win.webContents.once("did-finish-load", () => {
    showOnLoad && win.show();
  });

  win.removeMenu();
  win.loadURL(`http://${host}:${port}?electron`);
  watch && win.webContents.openDevTools();
};
