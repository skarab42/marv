const state = require("../state");
const { chat } = require("../index");

const loggers = require("../../../libs/loggers");
const settings = require("../../../libs/settings");
const chatJoin = require("../../../libs/twitch/chat/join");

let connectId = null;
let maxReconnect = 10;
let reconnectCount = 0;
let reconnectDelay = 2; // seconds

let pendingConnection = {
  resolve: null,
  reject: null,
  channel: null,
};

const logger = loggers.get("server");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function reconnect() {
  const delay = getRandomInt(1000);
  connectId && clearTimeout(connectId);
  logger.info(`[chat] reconnect in ${reconnectDelay} s`);
  connectId = setTimeout(_connect, reconnectDelay * 1000 + delay);
  reconnectDelay *= 2;
}

chat.onDisconnect((manually) => {
  state.set("chat.connected", false);
  if (!manually) reconnect();
});

function onRegister() {
  return new Promise((resolve) => {
    chat.onRegister(() => {
      state.set("chat.registered", true);
      resolve();
    });
  });
}

async function join(channel) {
  const join = await chatJoin(channel);

  if (!join.alreadyJoined) {
    logger.info(`[chat] joined ${channel}`);
    settings.set("twitch.currentChannel", channel);
  }
}

async function _connect() {
  const { channel, resolve, reject } = pendingConnection;

  try {
    await chat.connect();
    await onRegister();
    await join(channel);
    state.set("chat.connected", true);
    state.set("chat.connecting", false);
    resolve({ label: "chat", message: "connected" });
  } catch (error) {
    state.set("chat.connected", false);
    state.set("chat.connecting", false);
    logger.error(`[chat] ${error.stack}`);

    if (chat._connection) {
      chat.quit();
    }

    if (reconnectCount >= maxReconnect) {
      const message = `Too many reconnection failures (max:${maxReconnect})`;
      logger.error(`[chat] ${message}`);
      reject({ label: "chat", message });
      return;
    }

    reconnectCount++;
    reconnect();
  }
}

function connect(settings) {
  if (state.get("chat.connected")) {
    return Promise.resolve({ connected: true });
  }

  if (state.get("chat.connecting")) {
    return Promise.resolve({ connecting: true });
  }

  state.set("chat.connecting", true);

  return new Promise((resolve, reject) => {
    connectId = null;
    reconnectCount = 0;
    reconnectDelay = 2;
    pendingConnection = {
      ...settings,
      resolve,
      reject,
    };
    _connect();
  });
}

module.exports = connect;
