const config = require("./config");
const state = require("./state");
const { ApiClient } = require("twitch");
const AuthProvider = require("./AuthProvider");
const authMiddleware = require("./authMiddleware");
const { ChatClient } = require("twitch-chat-client");

const twitch = {
  state,
  config,
  api: null,
  chat: null,
  authProvider: null,
  authMiddleware: null,
};

module.exports = function init() {
  if (twitch.authProvider) return twitch;

  twitch.authProvider = new AuthProvider(twitch.config);
  twitch.authMiddleware = authMiddleware.bind(twitch.authProvider);
  twitch.api = new ApiClient({ authProvider: twitch.authProvider });
  twitch.chat = new ChatClient(twitch.authProvider);

  return twitch;
};
