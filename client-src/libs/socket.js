import io from "socket.io-client";

const socket = io({ transports: ["websocket"], upgrade: false });

function socketEmitPromise(...args) {
  return new Promise((resolve, reject) => {
    socket.emit(...args, ({ payload, error }) => {
      error ? reject(error) : resolve(payload);
    });
  });
}

export default socket;
export { socketEmitPromise };
