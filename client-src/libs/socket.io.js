import client from "socket.io-client";

const defaultOptions = {
  transports: ["websocket"],
  upgrade: false
};

let socket = null;

function io(options = {}) {
  if (!socket) {
    socket = client({ ...defaultOptions, ...options });
  }

  return socket;
}

function on(...args) {
  if (!socket) {
    throw new Error("socket.io: Not connected");
  }

  socket.on(...args);
}

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

export default socket;
export { io, on, emit };
