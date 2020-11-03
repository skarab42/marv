const { app, Tray, Menu } = require("electron");
const { i18next } = require("../server/libs/i18next");
const createWindow = require("./window");
const capitalize = require("capitalize");
const store = require("../stores");
const open = require("open");

const { name, version, icon } = store.app.getAll();
const fingerprint = `${capitalize(name)} v${version}`;

let tray = null;

function openInBrowser() {
  const { host, port } = store.server.getAll();
  open(`http://${host}:${port}`);
}

function createMenu() {
  return Menu.buildFromTemplate([
    { label: fingerprint, enabled: false },
    { type: "separator" },
    {
      label: i18next.t("sentences.open-in-browser"),
      click: () => openInBrowser(),
    },
    {
      label: i18next.t("sentences.open-in-window"),
      click: () => createWindow(),
    },
    { type: "separator" },
    { label: capitalize(i18next.t("words.quit")), click: () => app.quit() },
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
