const { app, Tray, Menu } = require("electron");
const createWindow = require("./window");
const store = require("../stores");
const open = require("open");

const { name, version, icon } = store.app.getAll();
const fingerprint = `${name} v${version}`;

let tray = null;

function openInBrowser() {
  const { host, port } = store.server.getAll();
  open(`http://${host}:${port}`);
}

function createMenu() {
  return Menu.buildFromTemplate([
    { label: fingerprint, enabled: false },
    { type: "separator" },
    { label: "Open in browser", click: () => openInBrowser() },
    { label: "Open in window", click: () => createWindow() },
    { type: "separator" },
    { label: "Quit", click: () => app.quit() },
  ]);
}

function createTray() {
  tray = new Tray(icon);

  tray.setToolTip(fingerprint);
  tray.setContextMenu(createMenu());
  tray.setIgnoreDoubleClickEvents(true);

  return tray;
}

module.exports = () => tray || createTray();
