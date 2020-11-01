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
    socket.use(require("./api")(socket));
    socket.use(require("./unhandledEvent"));
  });

  return io;
};
