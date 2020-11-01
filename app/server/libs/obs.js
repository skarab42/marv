const OBSWebSocket = require("obs-websocket-js");
const socket = require("../socket.io");

let obs = null;
let io = socket();
let autoReconnect = true;
let reconnectionTimeout = 5000;
let reconnectionTimeoutId = null;

let status = {
  connected: false,
  connecting: false
};

function log(...args) {
  // eslint-disable-next-line
  console.log(">>> OBS:", ...args);
}

function getStatus() {
  return status;
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

function setStatus(newStatus) {
  status = { ...status, ...newStatus };
  emit("status", status);
}

function reconnect(settings) {
  obs = null;

  log(`Reconnecting in ${reconnectionTimeout / 1000} sec.`);
  setStatus({ connected: false, connecting: true });

  reconnectionTimeoutId = setTimeout(() => {
    connect(settings);
  }, reconnectionTimeout);
}

function connect({ host = "localhost", port = 4444, password = null } = {}) {
  if (obs) return obs;

  autoReconnect = true;
  const address = `${host}:${port}`;

  setStatus({ connected: false, connecting: true });
  log(`Connect (${address})`);
  emit("connect");

  function onConnectionClosed() {
    setStatus({ connected: false, connecting: false });
    log("Connection closed");
    emit("disconnected");
    obs = null;
    autoReconnect && reconnect({ host, port, password });
  }

  obs = new OBSWebSocket();

  obs
    .connect({ address, password })
    .then(() => {
      log("Connected");
      setStatus({ connected: true, connecting: false });
      obs.on("ConnectionClosed", onConnectionClosed);
      emit("connected");
      // onMessage(obs);
    })
    .catch(error => {
      log(`Error: ${error.code}`);
      setStatus({ connected: false, connecting: autoReconnect });
      autoReconnect && reconnect({ host, port, password });
    });
}

function disconnect() {
  setStatus({ connected: false, connecting: false });
  clearTimeout(reconnectionTimeoutId);
  reconnectionTimeoutId = null;
  obs && obs.disconnect();
  autoReconnect = false;
  obs = null;
}

module.exports = {
  connect,
  disconnect,
  getStatus,
  send
};
