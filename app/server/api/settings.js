const settings = require("../libs/settings");

module.exports = (method, ...args) => settings[method](...args);
