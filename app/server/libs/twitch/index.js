const state = require("./state");
const config = require("./config");
const { ApiClient } = require("twitch");
const AuthProvider = require("./AuthProvider");
const authMiddleware = require("./authMiddleware");
const { ChatClient } = require("twitch-chat-client");

const twitch = {
  config,
  authProvider: null,
  authMiddleware: null,
  api: null,
  chat: null,
  state,
  init,
  chatJoin,
  chatConnect,
};

function chatJoin(channel) {
  const joinedChannels = state.get("chat.joinedChannels");

  if (joinedChannels.includes(channel)) {
    return Promise.resolve({ alreadyJoined: true });
  }

  joinedChannels.push(channel);

  return twitch.chat.join(channel).catch((error) => {
    state.set(
      "chat.joinedChannels",
      joinedChannels.filter((c) => c !== channel)
    );
    return Promise.reject(error);
  });
}

function chatConnect() {
  if (state.get("chat.connected")) {
    return Promise.resolve({ alreadyConnected: true });
  }

  if (state.get("chat.connecting")) {
    throw new Error("Twitch chat already connecting...");
  }

  state.set("chat.connecting", true);

  return twitch.chat
    .connect()
    .then(() => {
      state.set("chat.connected", true);
      state.set("chat.connecting", false);
      return new Promise((resolve) => {
        twitch.chat.onRegister(() => {
          state.set("chat.registered", true);
          resolve();
        });
      });
    })
    .catch((error) => {
      state.set("chat.connected", false);
      return Promise.reject(error);
    });
}

async function init() {
  twitch.authProvider = new AuthProvider(twitch.config);
  twitch.authMiddleware = authMiddleware.bind(twitch.authProvider);
  twitch.api = new ApiClient({ authProvider: twitch.authProvider });
  twitch.chat = new ChatClient(twitch.authProvider);
}

module.exports = twitch;
