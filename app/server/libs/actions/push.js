const socket = require("../socket.io");
const { v4: uuid } = require("uuid");

const io = socket();

const queue = [];
let lock = false;

function sendAction(action) {
  io.emit("actions.start", action);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve(action);
      else reject(new Error("Oops"));
      io.emit("actions.end", action);
    }, 2000);
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

function createAction(action) {
  return {
    id: uuid(),
    type: null,
    widgetId: null,
    trigger: "immediat",
    data: null,
    ...action,
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
  action = createAction(action);

  io.emit("actions.push", action);

  if (action.trigger === "immediat") {
    return sendAction(action);
  }

  return pushAction(action);
};
