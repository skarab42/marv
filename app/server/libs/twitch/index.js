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
  const host = await settings.get("server.host");
  const port = await settings.get("server.port");
  const scope = await settings.get("twitch.scope", []);
  const accessToken = await settings.get("twitch.accessToken", null);
  const redirectURI = `http://${host}:${port}/${config.redirectPath}`;
  api.authProvider = new AuthProvider({
    ...config,
    redirectURI,
    accessToken,
    scope,
  });
  api.api = new ApiClient({ authProvider: api.authProvider });
  api.chat = new ChatClient(api.authProvider, {
    requestMembershipEvents: true,
  });
};

module.exports = api;
