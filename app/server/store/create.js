const Conf = require("conf");

module.exports = function create({ name, ...options }) {
  return new Conf({ ...options, configName: name });
};
