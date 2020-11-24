const dotProp = require("dot-prop");

let state = {
  user: null,
  chat: {
    connecting: false,
    connected: false,
    registered: false,
    joinedChannels: [],
  },
};

function get(key = null, defaultValue = null) {
  return key ? dotProp.get(state, key, defaultValue) : { ...state };
}

function set(key, value) {
  return dotProp.set(state, key, value);
}

function update(newState) {
  state = { ...state, ...newState };
}

module.exports = { get, set, update };
