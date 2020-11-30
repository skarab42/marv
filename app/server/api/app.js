const { getSystemFonts, getUsedFonts } = require("../libs/files");

module.exports = {
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
};
