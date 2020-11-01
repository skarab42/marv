const Conf = require("conf");

class Store extends Conf {
  constructor(name, options = {}) {
    super({ ...options, configName: name });
  }

  getAll() {
    return this.store;
  }
}

module.exports = (name, options = {}) => new Store(name, options);
