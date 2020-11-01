const create = require("./create");
const path = require("path");
const fs = require("fs");

const modulesPath = path.resolve(__dirname, "defaults");

function loadModules() {
  const modules = {};

  fs.readdirSync(modulesPath).forEach((filename) => {
    const name = path.parse(filename).name;
    const defaults = require(`./defaults/${name}`);
    modules[name] = create(name, { defaults });
  });

  return modules;
}

module.exports = loadModules();
