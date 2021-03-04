const socket = require("../socket.io");
const dotProp = require("dot-prop");

const io = socket();

let state = {
  user: null,
  userState: {
    connected: false,
    connecting: false,
  },
  stream: null,
  error: null,
  chat: {
    connecting: false,
    connected: false,
    registered: false,
    joinedChannels: [],
  },
  pubsub: {
    connected: false,
    connecting: false,
  },
};

function get(key = null, defaultValue = null) {
  return key ? dotProp.get(state, key, defaultValue) : { ...state };
}

function set(key, value) {
  dotProp.set(state, key, value);
  const rootKey = key.split(".").shift();
  io.emit(`twitch.state.${rootKey}`, get(rootKey));
}

module.exports = { get, set };
