const { getSystemFonts, getUsedFonts } = require("../libs/files");
const settings = require("../libs/settings");
const loggers = require("../libs/loggers");
const io = require("../libs/socket.io");

const logger = loggers.get("app");
const types = ["info", "warning", "error", "notice"];

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
  stateNotify(type, message, data = undefined) {
    io().emit("app.notice", { type, message, options: { data } });
    type = types.includes(type) ? type : "notice";
    logger[type](message, data);
  },
};
