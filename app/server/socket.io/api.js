const dotProp = require("dot-prop");
const path = require("path");
const fs = require("fs");

const apiPath = path.resolve(__dirname, "../api");
const modules = {};

function loadModules(socket) {
  fs.readdirSync(apiPath).forEach(filename => {
    const name = path.parse(filename).name;
    modules[name] = require(`../api/${name}`)(socket);
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
      return callback({ error });
    }
  }

  callback({ payload });
}

module.exports = socket => {
  loadModules(socket);
  return middleware;
};
