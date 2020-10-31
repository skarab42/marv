const socket = require("socket.io");
const i18nAPI = require("../api/i18n");
const storeAPI = require("../api/store");
const configAPI = require("../api/config");
const unhandledEvent = require("./unhandledEvent");

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
    socket.use(i18nAPI);
    socket.use(storeAPI);
    socket.use(configAPI);
    socket.use(unhandledEvent);
  });

  return io;
};
