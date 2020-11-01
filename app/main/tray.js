const { app, Tray, Menu } = require("electron");
const store = require("../store");
const open = require("open");

const { name, version, icon } = store.app.getAll();
const fingerprint = `${name} v${version}`;

const { host, port } = store.server.getAll();
const address = `http://${host}:${port}`;

let tray = null;

function createMenu() {
  return Menu.buildFromTemplate([
    { label: fingerprint, enabled: false },
    { type: "separator" },
    { label: "Open", click: () => open(address) },
    { type: "separator" },
    { label: "Quit", click: () => app.quit() }
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
