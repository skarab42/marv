const dotProp = require("dot-prop");
const config = require("../../config");

module.exports = (args, next) => {
  if (args[0] !== "config.get") {
    return next();
  }

  args.shift();

  const callback = args.pop();

  if (typeof callback !== "function") {
    throw new Error("Undefined socket.io callback");
  }

  callback({ payload: dotProp.get(config, ...args) });
};
