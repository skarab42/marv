const socket = require("socket.io");
let io = null;

module.exports = server => {
  if (io) return io;

  io = socket(server);

  io.on("connection", socket => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
};
