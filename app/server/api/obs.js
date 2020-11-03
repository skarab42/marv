const stores = require("../../stores");
const obs = require("../libs/obs");

module.exports = (/* socket */) => {
  return {
    connect: () => obs.connect(stores.obs.getAll()),
    disconnect: obs.disconnect,
    getState: obs.getState,
    emit: obs.send,
  };
};
