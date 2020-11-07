const { app } = require("electron");

module.exports = function quit() {
  app.__isQuitting = true;
  app.quit();
};
