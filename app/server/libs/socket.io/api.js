const dotProp = require("dot-prop");
const path = require("path");
const fs = require("fs");

const apiDir = "../../api";
const apiPath = path.resolve(__dirname, apiDir);

const modules = {};

function loadModules() {
  fs.readdirSync(apiPath).forEach((filename) => {
    const name = path.parse(filename).name;
    modules[name] = require(`${apiDir}/${name}`);
  });
}

async function middleware(socket, [key, ...args], next) {
  const callback = args.pop();
  const item = dotProp.get(modules, key);

  if (item === undefined) {
    return next();
  }

  let payload = item;

  if (typeof item === "function") {
    try {
      const func = item.bind(socket);
      payload = await func(...args);
    } catch (error) {
      let message = error;
      if (message instanceof Error) {
        message = `${error.message}\n${error.stack}`;
      }
      return callback({ error: message });
    }
  }

  callback({ payload });
}

function extend(socket) {
  socket.notify = (...args) => {
    socket.emit(...args, { owner: true });
    socket.broadcast.emit(...args, { owner: false });
  };
}

module.exports = (socket) => {
  loadModules();
  extend(socket);
  return middleware.bind(null, socket);
};
