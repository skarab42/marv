module.exports = {
  get: require("./actions/get"),
  push: require("./actions/push"),
  update: require("./actions/update"),
  remove: require("./actions/remove"),
  getState: require("./actions/state").getState,
};
