const socket = require("socket.io");
const storeAPI = require("./store/api");
const configAPI = require("./config-api");
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
    socket.use(storeAPI);
    socket.use(configAPI);
    socket.use(unhandledEvent);
  });

  return io;
};
