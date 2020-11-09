const stores = require("../../stores");
const obs = require("../libs/obs");

module.exports = {
  connect: () => obs.connect(stores.obs.getAll()),
  disconnect: () => obs.disconnect(),
  getState: () => obs.getState(),
  emit: (type, ...args) => obs.send(type, ...args),
};
