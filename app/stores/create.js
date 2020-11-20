const { userPaths } = require("./utils");
const Conf = require("conf");
const path = require("path");

const cwd = path.join(userPaths.data, "stores");

class Store extends Conf {
  constructor(name, options = {}) {
    super({ ...options, configName: name, cwd });
  }

  getAll() {
    return this.store;
  }
}

module.exports = (name, options = {}) => new Store(name, options);
