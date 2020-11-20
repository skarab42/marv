const { staticPath, watch } = require("../../utils");
const { BrowserWindow } = require("electron");
const hideOnClose = require("./hideOnClose");
const stores = require("../../stores");
const path = require("path");

const { host, port } = stores.server.getAll();

let win = null;

function createWindow() {
  if (win) {
    return win.show();
  }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    icon: path.join(staticPath, "icon.png"),
    webPreferences: { devTools: watch },
  });

  hideOnClose(win);

  win.webContents.once("did-finish-load", () => {
    win.show();
  });

  win.removeMenu();
  win.loadURL(`http://${host}:${port}`);
  watch && win.webContents.openDevTools();
}

module.exports = createWindow;
