const socket = require("socket.io");

let io = null;

const options = {
  cookie: false,
  serveClient: false,
  allowUpgrades: false,
  transports: ["websocket"],
};

module.exports = (server) => {
  if (io) return io;

  io = socket(server, options);

  io.origins((origin, callback) => {
    callback(null, true);
  });

  io.on("connection", (clientSocket) => {
    clientSocket.use(require("./api")(clientSocket));
    clientSocket.use(require("./unhandledEvent"));
  });

  // TODO extract this shit !!!!
  const adminNamespace = io.of("/overlay");

  adminNamespace.on("connection", (overlaySocket) => {
    io.__overlaySocket = overlaySocket;
    io.emit("overlay.connected");
    overlaySocket.on("disconnect", () => {
      io.__overlaySocket = null;
      io.emit("overlay.disconnected");
    });
  });

  return io;
};
