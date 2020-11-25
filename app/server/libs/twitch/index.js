const config = require("./config");
const { ApiClient } = require("twitch");
const AuthProvider = require("./AuthProvider");
const { ChatClient } = require("twitch-chat-client");

const authProvider = new AuthProvider(config);
const api = new ApiClient({ authProvider });
const chat = new ChatClient(authProvider);

module.exports = {
  authProvider,
  config,
  chat,
  api,
};
