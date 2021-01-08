module.exports = async function initEvents() {
  require("./chat/events");
  await require("./pubsub")();
  require("./plugins/install")();
};
