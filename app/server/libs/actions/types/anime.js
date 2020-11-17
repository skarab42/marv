const socket = require("../../socket.io");
const createAction = require("../create");
const get = require("../get");

const io = socket();

const timeoutDelta = 1.5;

function create(action) {
  const { duration, items } = get(action.widget.id);
  return createAction({ ...action, duration }, items);
}

function send(action) {
  return new Promise((resolve, reject) => {
    if (!io.__overlaySocket) {
      return reject({ error: "Overlay closed", action });
    }

    io.__overlaySocket.emit("actions.start", action, ({ error }) => {
      error ? reject({ error, action }) : resolve(action);
    });

    setTimeout(() => {
      reject({ error: "Action timeout", action });
    }, action.duration * timeoutDelta);
  });
}

module.exports = { create, send };
