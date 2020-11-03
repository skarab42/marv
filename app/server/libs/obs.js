const OBSWebSocket = require("obs-websocket-js");
const socket = require("./socket.io");

let obs = null;
let io = socket();
let autoReconnect = true;
let reconnectionTimeout = 5000;
let reconnectionTimeoutId = null;

let state = {
  connected: false,
  connecting: false,
};

let connecting = false;

function log(...args) {
  // eslint-disable-next-line
  console.log(">>> OBS:", ...args);
}

function getState() {
  return state;
}

function send(...args) {
  if (!obs) {
    return Promise.reject("OBS is not initialized");
  }
  return obs.send(...args);
}

function emit(type, ...args) {
  io.emit(`obs.${type}`, ...args);
}

function setState(newState) {
  state = { ...state, ...newState };
  emit("state", state);
}

function onMessage(obs) {
  const onmessage = obs._socket.onmessage;
  obs._socket.onmessage = (msg) => {
    onmessage(msg);
    console.log({ msg });
    const message = JSON.parse(msg.data);
    if (message["update-type"]) {
      const type = message["update-type"];
      log("event:", type);
      send(type, message);
    }
  };
}

function reconnect(settings) {
  obs = null;

  log(`Reconnecting in ${reconnectionTimeout / 1000} sec.`);
  setState({ connected: false, connecting: true });

  reconnectionTimeoutId = setTimeout(() => {
    connecting = false;
    connect(settings);
  }, reconnectionTimeout);
}

function connect({ host = "localhost", port = 4444, password = null } = {}) {
  if (obs || connecting) return;

  connecting = true;
  autoReconnect = true;
  const address = `${host}:${port}`;

  setState({ connected: false, connecting: true });
  log(`Connect (${address})`);
  emit("connect");

  function onConnectionClosed() {
    setState({ connected: false, connecting: false });
    log("Connection closed");
    emit("disconnected");
    obs = null;
    if (autoReconnect) {
      reconnect({ host, port, password });
    } else {
      connecting = false;
    }
  }

  obs = new OBSWebSocket();

  obs
    .connect({ address, password })
    .then(() => {
      log("Connected");
      connecting = false;
      setState({ connected: true, connecting });
      obs.on("ConnectionClosed", onConnectionClosed);
      emit("connected");
      onMessage(obs);
    })
    .catch((error) => {
      log(`Error: ${error.code}`);
      setState({ connected: false, connecting: autoReconnect });
      if (autoReconnect) {
        reconnect({ host, port, password });
      } else {
        connecting = false;
      }
    });
}

function disconnect() {
  connecting = false;
  setState({ connected: false, connecting });
  clearTimeout(reconnectionTimeoutId);
  reconnectionTimeoutId = null;
  obs && obs.disconnect();
  autoReconnect = false;
  obs = null;
}

module.exports = {
  connect,
  disconnect,
  getState,
  send,
};
