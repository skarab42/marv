const loggers = require("../../../libs/loggers");
const twitch = require("../index");
const state = require("../state");

let connectId = null;
let maxReconnect = 2;
let reconnectCount = 0;
let reconnectDelay = 2; // seconds

const logger = loggers.get("twitch");

let pendingConnection = {
  resolve: null,
  reject: null,
  channel: null,
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function reconnect() {
  const delay = getRandomInt(1000);
  connectId && clearTimeout(connectId);
  logger.info(`[user] reconnect in ${reconnectDelay} s`);
  connectId = setTimeout(_connect, reconnectDelay * 1000 + delay);
  reconnectDelay *= 2;
}

async function _connect() {
  const { resolve, reject } = pendingConnection;

  try {
    const user = await twitch.api.helix.users.getMe(true);
    if (!user) {
      throw new Error("User not found");
    }
    state.set("userState.connected", true);
    state.set("userState.connecting", false);
    resolve(user._data);
  } catch (error) {
    logger.error(`[user] ${error.stack}`);
    state.set("error", { label: "user", message: error.message });

    if (reconnectCount >= maxReconnect) {
      const message = `Too many reconnection failures (max:${maxReconnect})`;
      const error = { label: "user", message };
      state.set("userState.connecting", false);
      state.set("userState.connected", false);
      logger.error(`[user] ${message}`);
      state.set("error", error);
      reject(error);
      return;
    }

    reconnectCount++;
    reconnect();
  }
}

module.exports = async function getConnectedUser() {
  if (state.get("userState.connected")) {
    return Promise.resolve({ connected: true });
  }

  if (state.get("userState.connecting")) {
    return Promise.resolve({ connecting: true });
  }

  state.set("userState.connecting", true);
  state.set("error", null);

  return new Promise((resolve, reject) => {
    pendingConnection = { resolve, reject };
    reconnectDelay = 2;
    reconnectCount = 0;
    connectId = null;
    _connect();
  });
};
