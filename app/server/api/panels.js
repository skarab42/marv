module.exports = (socket) => {
  return {
    add() {
      console.log("addPanel...", socket.id);
      socket.emit("panels.add", "prout");
    },
  };
};
