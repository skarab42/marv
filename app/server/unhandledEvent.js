module.exports = args => {
  const eventName = args.shift();
  const callback = args.pop();
  if (typeof callback === "function") {
    callback({ error: `Unhandled socket.io event: ${eventName}` });
  }
};
