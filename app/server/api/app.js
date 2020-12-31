const { getSystemFonts, getUsedFonts } = require("../libs/files");
const settings = require("../libs/settings");

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
    const io = require("../libs/socket.io")();
    if (!io.__overlaySocket) return;
    io.__overlaySocket.emit("loadFont", url);
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
};
