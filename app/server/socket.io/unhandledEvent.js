module.exports = args => {
  const callback = args.pop();
  const eventName = args.shift();
  if (typeof callback === "function") {
    callback({ error: `Unhandled socket.io event: ${eventName}` });
  }
};
