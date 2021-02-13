const state = require("../state");
const { chat } = require("../index");

let connectId = null;
const reconnectDelay = 5; // seconds

function delayConnect() {
  connectId && clearTimeout(connectId);
  connectId = setTimeout(reconnect, reconnectDelay * 1000);
}

function reconnect() {
  state.set("chat.connected", false);
  connect().catch(() => {
    delayConnect();
  });
}

chat.onDisconnect((manually) => {
  state.set("chat.connected", false);
  if (!manually) delayConnect();
});

function connect() {
  if (state.get("chat.connected") || state.get("chat.connecting")) {
    return Promise.resolve({ alreadyConnected: true });
  }

  state.set("chat.connecting", true);

  return chat
    .connect()
    .then(() => {
      state.set("chat.connected", true);
      state.set("chat.connecting", false);
      return new Promise((resolve) => {
        chat.onRegister(() => {
          state.set("chat.registered", true);
          resolve();
        });
      });
    })
    .catch((error) => {
      state.set("chat.connected", false);
      return Promise.reject(error);
    });
}

module.exports = connect;
