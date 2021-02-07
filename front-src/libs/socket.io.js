import client from "socket.io-client";

const defaultOptions = {
  transports: ["websocket"],
  upgrade: false,
};

export default function io(ns = "", options = {}) {
  let socket = client(ns, { ...defaultOptions, ...options });

  return {
    socket,

    on(...args) {
      if (!socket) {
        throw new Error("socket.io: Not connected");
      }

      socket.on(...args);
    },

    emit(...args) {
      return new Promise((resolve, reject) => {
        if (!socket) {
          return reject(new Error("socket.io: Not connected"));
        }

        socket.emit(...args, ({ payload, error }) => {
          error ? reject(error) : resolve(payload);
        });
      });
    },
  };
}
