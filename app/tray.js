const { app, Tray, Menu } = require("electron");
const config = require("./config");
const open = require("open");

const { name, version, icon } = config.app;
const fingerprint = `${name} v${version}`;

const { host, port } = config.server;
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
