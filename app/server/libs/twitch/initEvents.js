module.exports = function initEvents() {
  require("./pubsub")();
  require("./chat/events");
};
