const socket = require("../socket.io");

const io = socket();

let state = {};

function push(action) {
  let widgetState = state[action.widget.id];

  if (!widgetState) {
    state[action.widget.id] = { ...action, inQueue: 1, running: false };
  } else {
    widgetState.inQueue++;
  }

  io.emit("actions.push", state[action.widget.id]);
  io.emit("actions.state", state);

  return widgetState;
}

function update(type, action) {
  let widgetState = state[action.widget.id];
  state[action.widget.id] = { ...widgetState, ...action };

  io.emit(`actions.${type}`, state[action.widget.id]);
  io.emit("actions.state", state);

  return widgetState;
}

function decrement(action) {
  let widgetState = state[action.widget.id];
  widgetState.inQueue--;
  state[action.widget.id] = { ...widgetState };
  return state[action.widget.id];
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
