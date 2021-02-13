const OBSWebSocket = require("obs-websocket-js");
const { watch } = require("../../utils");
const socket = require("./socket.io");
const loggers = require("./loggers");
const { _ } = require("./i18next");

let obs = null;
const io = socket();
const logger = loggers.get("obs");

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
  scenes: null,
  currentScene: null,
};

function getState() {
  return state;
}

function send(...args) {
  if (!obs) {
    return Promise.reject(_("sentences.obs-is-not-initialized"));
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

function updateSceneList() {
  return send("GetSceneList").then(({ currentScene, scenes }) => {
    updateState({ currentScene, scenes });
  });
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

  obs.on("SwitchScenes", ({ sceneName }) => {
    updateState({ currentScene: sceneName });
  });

  obs.on("ScenesChanged", updateSceneList);
}

function onMessage(obs) {
  const onmessage = obs._socket.onmessage;
  obs._socket.onmessage = (msg) => {
    onmessage(msg);
    let { type, data } = msg;
    if (type !== "message") return;
    data = JSON.parse(data);
    const eventName = data["update-type"];
    eventName && logger.debug(eventName, data);
  };
}

function reconnect(settings) {
  obs = null;

  logger.info(`Reconnecting in ${reconnectionTimeout / 1000} sec.`);
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
  logger.info(`Connecting to ${address}`);
  emit("connect");

  function onConnectionClosed() {
    logger.info("Connection closed");
    updateState({ connected: false, connecting: false });
    clearRecordingHeartbeat();
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
      logger.info("Connected");
      connecting = false;
      updateState({ connected: true, connecting });
      obs.on("ConnectionClosed", onConnectionClosed);
      watch && onMessage(obs);
      registerEvents(obs);
      updateStreamStatus();
      updateSceneList();
      emit("connected");
    })
    .catch((error) => {
      logger.error(`Code -> ${error.code}`);
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
