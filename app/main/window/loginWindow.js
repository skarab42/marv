const { BrowserWindow, session } = require("electron");
const { staticPath, watch } = require("../../utils");
const injectTitlebar = require("./injectTitlebar");
const webPreferences = require("./webPreferences");
const path = require("path");

let win = null;

session.defaultSession.webRequest.onCompleted(
  { urls: ["https://passport.twitch.tv/login"] },
  ({ statusCode }) => {
    if (win && statusCode === 200) {
      win.getParentWindow().reload();
      win.close();
      win = null;
    }
  }
);

module.exports = function loginWindow({ parent, url }) {
  win = new BrowserWindow({
    parent,
    width: 800,
    height: 600,
    show: false,
    frame: false,
    icon: path.join(staticPath, "icon.png"),
    webPreferences: { ...webPreferences, devTools: watch },
  });

  win.webContents.on("did-finish-load", async () => {
    await injectTitlebar({ win, title: `Twitch chat login` });
    win.show();
  });

  win.removeMenu();
  win.loadURL(url);
  watch && win.webContents.openDevTools();
};
