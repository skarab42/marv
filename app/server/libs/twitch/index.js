const state = require("./state");
const config = require("./config");
const { ApiClient } = require("twitch");
const AuthProvider = require("./AuthProvider");
const authMiddleware = require("./authMiddleware");

const twitch = {
  config,
  authProvider: null,
  authMiddleware: null,
  api: null,
  state,
  init,
};

async function init() {
  twitch.authProvider = new AuthProvider(twitch.config);
  twitch.api = new ApiClient({ authProvider: twitch.authProvider });
  twitch.authMiddleware = authMiddleware.bind(twitch.authProvider);
}

module.exports = twitch;
