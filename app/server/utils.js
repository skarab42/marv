const settings = require("./libs/settings");

async function getServerURL() {
  const { host, port } = await settings.getAll("server.");
  return `http://${host}:${port}`;
}

module.exports = {
  getServerURL,
};
