const stores = require("../stores");

function getServerURL() {
  const { host, port } = stores.server.getAll();
  return `http://${host}:${port}`;
}

module.exports = {
  getServerURL,
};
