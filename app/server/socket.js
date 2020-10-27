const socket = require("socket.io");
const storeAPI = require("./store/api");

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
  });

  return io;
};
