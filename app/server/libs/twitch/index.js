const config = require("./config");
const settings = require("../settings");
const { ApiClient } = require("twitch");
const AuthProvider = require("./AuthProvider");
const { ChatClient } = require("twitch-chat-client");

const api = {
  config,
  authProvider: null,
  chat: null,
  api: null,
};

api.init = async function init() {
  const scope = await settings.get("twitch.scope", []);
  const accessToken = await settings.get("twitch.accessToken", null);

  api.authProvider = new AuthProvider({ ...config, accessToken, scope });
  api.api = new ApiClient({ authProvider: api.authProvider });
  api.chat = new ChatClient(api.authProvider);
};

module.exports = api;
