const OBSWebSocket = require("obs-websocket-js");
const socket = require("./socket.io");

let obs = null;
const io = socket();

let connecting = false;
let autoReconnect = true;
let reconnectionTimeout = 5000;
let reconnectionTimeoutId = null;

let recordingHeartbeatId = null;
let recordingHeartbeatTimeout = 2000;

let state = {
  connected: false,
  connecting: false,
  streaming: false,
  recording: false,
  status: null,
};

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
  return obs.send(...args).catch((data) => {
    return Promise.reject(data.error);
  });
}

function emit(type, ...args) {
  io.emit(`obs.${type}`, ...args);
}

function updateState(props) {
  state = { ...state, ...props };
  emit("state", state);
}

function onStreamStatus(status) {
  const { streaming, recording } = status;
  updateState({ streaming, recording, status });
}

function updateStreamStatus() {
  send("GetStreamingStatus").then(onStreamStatus);
}

function recordingHeartbeat() {
  recordingHeartbeatId = setTimeout(() => {
    updateStreamStatus();
    recordingHeartbeat();
  }, recordingHeartbeatTimeout);
}

function clearRecordingHeartbeat() {
  clearTimeout(recordingHeartbeatId);
  recordingHeartbeatId = null;
}

function registerEvents(obs) {
  obs.on("RecordingStarted", () => {
    updateState({ recording: true });
    !state.streaming && recordingHeartbeat();
  });

  obs.on("RecordingStopped", () => {
    updateState({ recording: false });
    clearRecordingHeartbeat();
  });

  obs.on("StreamStarted", () => {
    updateState({ streaming: true });
    clearRecordingHeartbeat();
  });

  obs.on("StreamStopped", () => {
    updateState({ streaming: false });
    state.recording && recordingHeartbeat();
  });

  obs.on("StreamStatus", onStreamStatus);
}

// function onMessage(obs) {
//   const onmessage = obs._socket.onmessage;
//   obs._socket.onmessage = (msg) => {
//     onmessage(msg);
//     let { type, data } = msg;
//     if (type !== "message") return;
//     data = JSON.parse(data);
//     const eventName = data["update-type"];
//     eventName && log(eventName, data);
//   };
// }

function reconnect(settings) {
  obs = null;

  log(`Reconnecting in ${reconnectionTimeout / 1000} sec.`);
  updateState({ connected: false, connecting: true });

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

  updateState({ connected: false, connecting: true });
  log(`Connect (${address})`);
  emit("connect");

  function onConnectionClosed() {
    updateState({ connected: false, connecting: false });
    clearRecordingHeartbeat();
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
      updateState({ connected: true, connecting });
      obs.on("ConnectionClosed", onConnectionClosed);
      registerEvents(obs);
      updateStreamStatus();
      // onMessage(obs);
      emit("connected");
    })
    .catch((error) => {
      log(`Error: ${error.code}`);
      updateState({ connected: false, connecting: autoReconnect });
      if (autoReconnect) {
        reconnect({ host, port, password });
      } else {
        connecting = false;
      }
    });
}

function disconnect() {
  connecting = false;
  updateState({ connected: false, connecting });
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
