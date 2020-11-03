const dotProp = require("dot-prop");
const path = require("path");
const fs = require("fs");

const apiDir = "../../api";
const apiPath = path.resolve(__dirname, apiDir);

const modules = {};

function loadModules(socket) {
  fs.readdirSync(apiPath).forEach((filename) => {
    const name = path.parse(filename).name;
    modules[name] = require(`${apiDir}/${name}`)(socket);
  });
}

async function middleware([key, ...args], next) {
  const callback = args.pop();
  const item = dotProp.get(modules, key);

  if (item === undefined) {
    return next();
  }

  let payload = item;

  if (typeof item === "function") {
    try {
      payload = await item(...args);
    } catch (error) {
      const message = error.message || error;
      return callback({ error: `[socket.io] ${key}: ${message}` });
    }
  }

  callback({ payload });
}

module.exports = (socket) => {
  loadModules(socket);
  return middleware;
};
