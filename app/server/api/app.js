const { getSystemFonts, getUsedFonts } = require("../libs/files");
const settings = require("../libs/settings");
const io = require("../libs/socket.io");

module.exports = {
  quit: () => {
    process.exit(42);
  },
  getOS: () => {
    return process.platform;
  },
  getFonts: async () => {
    return (await getSystemFonts()).fontNames;
  },
  loadFont: (url) => {
    const socket = io();
    if (!socket.__overlaySocket) return;
    socket.__overlaySocket.emit("loadFont", url);
  },
  getUsedFonts: () => {
    return getUsedFonts();
  },
  getSettings: async () => {
    const app = await settings.getAll("app.");
    const server = await settings.getAll("server.");
    return { ...app, server };
  },
  setSetting: (key, value) => {
    return settings.set(`app.${key}`, value);
  },
  stateNotify(type, message, options = null) {
    io().emit("app.notice", { type, message, options });
  },
};
