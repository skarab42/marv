const io = require("../libs/socket.io");

module.exports = {
  isConnected() {
    return !!io().__overlaySocket;
  },
};
