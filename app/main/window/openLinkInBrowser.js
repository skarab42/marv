const open = require("open");
const loginWindow = require("./loginWindow");

module.exports = function openLinkInBrowser(win) {
  win.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    const isTwitchLogin = url === "https://www.twitch.tv/login?popup=true";
    isTwitchLogin ? loginWindow({ parent: win, url }) : open(url);
  });
};
