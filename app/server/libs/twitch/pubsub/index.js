const { BasicPubSubClient, PubSubClient } = require("twitch-pubsub-client");
const loggers = require("../../../libs/loggers");
const onRedemption = require("./onRedemption");
const onBits = require("./onBits");
const twitch = require("../index");
const state = require("../state");

let connectId = null;
let maxReconnect = 10;
let reconnectCount = 0;
let reconnectDelay = 2; // seconds

let pendingConnection = {
  resolve: null,
  reject: null,
};

const logger = loggers.get("twitch");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function reconnect() {
  const delay = getRandomInt(1000);
  connectId && clearTimeout(connectId);
  logger.info(`[pubsub] reconnect in ${reconnectDelay} s`);
  connectId = setTimeout(_connect, reconnectDelay * 1000 + delay);
  reconnectDelay *= 2;
}

function createPubSubClient() {
  const rootClient = new BasicPubSubClient();
  rootClient.onDisconnect((manually) => {
    state.set("pubsub.connected", false);
    if (!manually) reconnect();
  });
  return new PubSubClient(rootClient);
}

async function _connect() {
  const { resolve, reject } = pendingConnection;

  try {
    const pubSubClient = createPubSubClient();
    const userId = await pubSubClient.registerUserListener(twitch.api);
    await pubSubClient.onRedemption(userId, onRedemption);
    await pubSubClient.onBits(userId, onBits);
    state.set("pubsub.connected", true);
    state.set("pubsub.connecting", false);
    resolve({ label: "pubsub", message: "connected" });
  } catch (error) {
    logger.error(`[pubsub] ${error.stack}`);
    state.set("error", { label: "pubsub", message: error.message });

    if (reconnectCount >= maxReconnect) {
      const message = `Too many reconnection failures (max:${maxReconnect})`;
      const error = { label: "pubsub", message };
      state.set("pubsub.connecting", false);
      state.set("pubsub.connected", false);
      logger.error(`[pubsub] ${message}`);
      state.set("error", error);
      reject(error);
      return;
    }

    reconnectCount++;
    reconnect();
  }
}

function connect() {
  if (state.get("pubsub.connected")) {
    return Promise.resolve({ connected: true });
  }

  if (state.get("pubsub.connecting")) {
    return Promise.resolve({ connecting: true });
  }

  state.set("pubsub.connecting", true);
  state.set("error", null);

  return new Promise((resolve, reject) => {
    pendingConnection = { resolve, reject };
    reconnectCount = 0;
    reconnectDelay = 2;
    connectId = null;
    _connect();
  });
}

module.exports = connect;
