const obs = require("../libs/obs");

module.exports = (args, next) => {
  if (!args[0].match(/^obs\./)) {
    return next();
  }

  const method = args.shift().slice(4);
  const callback = args.pop() || function() {};

  if (callback && typeof callback !== "function") {
    throw new Error("socket.io callback must be a function");
  }

  if (method === "connect") {
    obs.connect();
    return callback({ payload: "connecting" });
  }

  callback({ error: `Undefined obs method ${method}` });
};
