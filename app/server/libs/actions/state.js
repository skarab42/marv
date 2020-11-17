const socket = require("../socket.io");

const io = socket();

let state = {};

function push(action) {
  let widgetState = state[action.widget.id];

  if (!widgetState) {
    state[action.widget.id] = { inQueue: 1, running: false };
  } else {
    widgetState.inQueue++;
  }

  io.emit("actions.state", state);

  return widgetState;
}

function update(action) {
  let widgetState = state[action.widget.id];
  state[action.widget.id] = { ...widgetState, ...action };

  io.emit("actions.state", state);

  return widgetState;
}

function decrement(action) {
  let widgetState = state[action.widget.id];
  widgetState.inQueue--;
  state[action.widget.id] = { ...widgetState };
  return widgetState;
}

function getState() {
  return { ...state };
}

module.exports = {
  push,
  update,
  decrement,
  getState,
};
