const socket = require("socket.io");

let io = null;

const options = {
  cookie: false,
  serveClient: false,
  allowUpgrades: false,
  transports: ["websocket"]
};

module.exports = server => {
  if (io) return io;

  io = socket(server, options);

  io.on("connection", socket => {
    socket.use(require("./api"));
    // socket.use(require("../api/obs"));
    // socket.use(require("../api/i18n"));
    // socket.use(require("../api/store"));
    // socket.use(require("../api/config"));
    // socket.use(require("./unhandledEvent"));
  });

  return io;
};
