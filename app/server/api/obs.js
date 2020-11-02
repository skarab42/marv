const stores = require("../../stores");
const obs = require("../libs/obs");

module.exports = (/* socket */) => {
  return {
    getState() {
      return obs.getState();
    },
    connect() {
      return obs.connect(stores.obs.getAll());
    },
    disconnect() {
      return obs.disconnect();
    },
  };
};
