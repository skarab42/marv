module.exports = (args) => {
  const callback = args.pop();
  const eventName = args.shift();
  if (typeof callback === "function") {
    callback({ error: `[socket.io] Unhandled event: ${eventName}` });
  }
};
