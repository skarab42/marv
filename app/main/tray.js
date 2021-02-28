const { init: i18next, _ } = require("../server/libs/i18next");
const getTrayIconByPlatform = require("./window/trayIcon");
const { staticPath, fingerprint } = require("../utils");
const { getServerURL } = require("../server/utils");
const settings = require("../server/libs/settings");
const mainWindow = require("./window/mainWindow");
const chatWindow = require("./window/chatWindow");
const { Tray, Menu } = require("electron");
const capitalize = require("capitalize");
const quit = require("./quit");
const path = require("path");
const open = require("open");

const icon = getTrayIconByPlatform();

let tray = null;

async function openInBrowser() {
  open(await getServerURL());
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
      click: async () => (await mainWindow()).show(),
    },
    {
      label: _("sentences.open-twitch-chat-window"),
      click: async () => {
        chatWindow({
          channel: await settings.get("twitch.currentChannel", ""),
        });
      },
    },
    { type: "separator" },
    { label: capitalize(_("words.quit")), click: () => quit() },
  ]);
}

async function createTray() {
  await i18next();

  tray = new Tray(path.join(staticPath, icon));

  tray.setToolTip(fingerprint);
  tray.setContextMenu(createMenu());
  tray.setIgnoreDoubleClickEvents(true);
  tray.on("click", async () => (await mainWindow()).show());

  return tray;
}

module.exports = () => tray || createTray();
