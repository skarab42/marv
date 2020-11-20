const { _ } = require("../server/libs/i18next");
const { appPath } = require("../stores/utils");
const { Tray, Menu } = require("electron");
const createWindow = require("./window");
const capitalize = require("capitalize");
const store = require("../stores");
const quit = require("./quit");
const path = require("path");
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
      label: _("sentences.open-in-browser"),
      click: () => openInBrowser(),
    },
    {
      label: _("sentences.open-in-window"),
      click: () => createWindow(),
    },
    { type: "separator" },
    { label: capitalize(_("words.quit")), click: () => quit() },
  ]);
}

function createTray() {
  tray = new Tray(path.join(appPath, icon));

  tray.setToolTip(fingerprint);
  tray.setContextMenu(createMenu());
  tray.setIgnoreDoubleClickEvents(true);

  return tray;
}

module.exports = () => tray || createTray();
