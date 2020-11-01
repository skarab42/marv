import io from "socket.io-client";

const defaultOptions = {
  transports: ["websocket"],
  upgrade: false
};

let socket = null;

function emit(...args) {
  return new Promise((resolve, reject) => {
    if (!socket) {
      return reject(new Error("socket.io: Not connected"));
    }

    socket.emit(...args, ({ payload, error }) => {
      error ? reject(error) : resolve(payload);
    });
  });
}

function init(options = {}) {
  if (!socket) {
    socket = io({ ...defaultOptions, ...options });
  }

  return socket;
}

function on(...args) {
  socket && socket.on(...args);
}

export default init;
export { on, emit, socket };
