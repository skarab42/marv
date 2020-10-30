import io from "socket.io-client";

const defaultOptions = {
  transports: ["websocket"],
  upgrade: false
};

let socket = null;

function socketEmitPromise(...args) {
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

export default init;
export { socketEmitPromise, socket };
