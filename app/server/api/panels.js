module.exports = {
  add() {
    console.log("addPanel...", this.id);
    this.emit("panels.add", "me");
    this.broadcast.emit("panels.add", "all");
  },
};
