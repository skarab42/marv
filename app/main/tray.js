const mainWindow = require("./window/mainWindow");
const chatWindow = require("./window/chatWindow");
const { _ } = require("../server/libs/i18next");
const { Tray, Menu } = require("electron");
const { staticPath } = require("../utils");
const capitalize = require("capitalize");
const stores = require("../stores");
const quit = require("./quit");
const path = require("path");
const open = require("open");

const isWin32 = process.platform === "win32";
const icon = `icon.${isWin32 ? "ico" : "png"}`;
const { name, version } = require("../package");
const fingerprint = `${capitalize(name)} v${version}`;

let tray = null;

function openInBrowser() {
  const { host, port } = stores.server.getAll();
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
      click: () => mainWindow(),
    },
    {
      label: _("sentences.open-twitch-chat-window"),
      click: () => {
        chatWindow({ channel: stores.twitch.get("chatWindow.channel", "") });
      },
    },
    { type: "separator" },
    { label: capitalize(_("words.quit")), click: () => quit() },
  ]);
}

function createTray() {
  tray = new Tray(path.join(staticPath, icon));

  tray.setToolTip(fingerprint);
  tray.on("click", mainWindow);
  tray.setContextMenu(createMenu());
  tray.setIgnoreDoubleClickEvents(true);

  return tray;
}

module.exports = () => tray || createTray();
