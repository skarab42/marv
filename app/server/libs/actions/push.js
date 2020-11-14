const socket = require("../socket.io");
const { v4: uuid } = require("uuid");
const get = require("./get");

const io = socket();

const queue = [];
let lock = false;

function sendAction(action) {
  io.emit("actions.start", action);
  return new Promise((resolve, reject) => {
    io.__overlaySocket.emit("actions.start", action, ({ error }) => {
      error ? reject({ error, action }) : resolve(action);
      io.emit("actions.end", action);
    });
  });
}

function processQueue() {
  if (lock) return;

  if (!queue.length) {
    lock = false;
    return;
  }

  lock = true;

  const { action, resolve, reject } = queue.shift();

  return sendAction(action)
    .then((response) => {
      lock = false;
      processQueue();
      resolve(response);
    })
    .catch((error) => {
      lock = false;
      processQueue();
      reject(error);
    });
}

function createAction(action, data) {
  return {
    id: uuid(),
    type: null,
    widgetId: null,
    trigger: "immediat",
    ...action,
    data,
  };
}

function pushAction(action) {
  return new Promise((resolve, reject) => {
    if (action.trigger === "asap") {
      queue.unshift({ action, resolve, reject });
    } else {
      queue.push({ action, resolve, reject });
    }
    processQueue();
  });
}

module.exports = function push(action) {
  const { items } = get(action.widgetId);
  action = createAction(action, items);

  io.emit("actions.push", action);

  if (action.trigger === "immediat") {
    return sendAction(action);
  }

  return pushAction(action);
};
