const openLinkInBrowser = require("./openLinkInBrowser");
const { getServerURL } = require("../../server/utils");
const { staticPath, watch } = require("../../utils");
const webPreferences = require("./webPreferences");
const { BrowserWindow } = require("electron");
const storeBounds = require("./storeBounds");
const hideOnClose = require("./hideOnClose");
const path = require("path");

let win = null;
let currentChannel = null;

function loadChat(win, channel) {
  if (currentChannel === channel) return;
  win.loadURL(`https://www.twitch.tv/embed/${channel}/chat?parent=localhost`);
  currentChannel = channel;
}

module.exports = function chatWindow({ channel, showOnLoad = true } = {}) {
  if (win) {
    loadChat(win, channel);
    return win.show();
  }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    icon: path.join(staticPath, "icon.png"),
    webPreferences: { ...webPreferences, devTools: watch },
  });

  hideOnClose(win);
  openLinkInBrowser(win);
  storeBounds({ win, name: "chat" });

  win.webContents.on("did-finish-load", async () => {
    const serverURL = await getServerURL();

    win.webContents.insertCSS(`
      #root > div.tw-top-0 {
        top: 30px !important;
      }
      #electron-titlebar {
        display: flex;
        font-size: 14px;
        user-select: none;
        align-items: center;
        color: rgb(226, 232, 240);
        background-color: rgb(26, 32, 44);
      }
      #electron-titlebar > div {
        display: flex;
        height: 29px;
        padding-left: 8px;
        padding-right: 8px;
        align-items: center;
      }
      #electron-titlebar > div.icon {
        display: flex;
      }
      #electron-titlebar > div.title {
        padding: 1px 0;
        flex: 1 1 auto;
        display: flex;
        height: 24px;
      }
      #electron-titlebar > div.title > div {
        flex: 1 1 auto;
        -webkit-app-region: drag;
      }
      #electron-titlebar > div.cross {
        cursor: pointer;
      }
      #electron-titlebar > div.cross:hover {
        background-color: rgb(197, 48, 48);
      }
    `);
    win.webContents.executeJavaScript(`
      const $html = document.querySelector("html");
      const $body = document.querySelector("body");
      $html.classList.toggle("tw-root--theme-dark", true);
      $html.classList.toggle("tw-root--theme-light", false);
      const $titlebar = document.createElement('div');
      const $icon = document.createElement('div');
      const $title = document.createElement('div');
      const $cross = document.createElement('div');
      const $iconSVG = document.createElement('img');
      $titlebar.setAttribute('id', 'electron-titlebar');
      $iconSVG.setAttribute('src', '${serverURL}/icon.svg');
      $iconSVG.setAttribute('height', '16px');
      $icon.classList.add('icon');
      $title.classList.add('title');
      $cross.classList.add('cross');
      $icon.append($iconSVG);
      $title.innerHTML = '<div>${channel} - Twitch chat</div>';
      $cross.innerHTML = '✕';
      $titlebar.append($icon, $title, $cross);
      $cross.addEventListener('click', () => window.close());
      $body.prepend($titlebar);
    `);
    showOnLoad && win.show();
  });

  win.removeMenu();
  loadChat(win, channel);
  watch && win.webContents.openDevTools();
};
