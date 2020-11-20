const { appPath } = require("../../utils");
const { BrowserWindow } = require("electron");
const hideOnClose = require("./hideOnClose");
const store = require("../../stores");
const path = require("path");

let win = null;

const icon = path.join(appPath, store.app.get("icon"));
const devTools = !store.app.get("production");

function createWindow() {
  if (win) {
    return win.show();
  }

  win = new BrowserWindow({
    icon,
    width: 800,
    height: 600,
    show: false,
    webPreferences: { devTools },
  });

  hideOnClose(win);

  win.webContents.once("did-finish-load", () => {
    win.show();
  });

  win.loadURL("http://localhost:4242/");
  devTools && win.webContents.openDevTools();
}

module.exports = createWindow;
