const socket = require("../socket.io");

const actionTypes = {
  anime: require("./types/anime"),
  obs: require("./types/obs"),
};

const io = socket();

const queue = [];
let lock = false;

function sendAction(action) {
  const { send } = actionTypes[action.type] || {};

  if (!send) {
    return Promise.reject(`Undefined action type: ${action.type}`);
  }

  return send(action);
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

function pushAction(action) {
  return new Promise((resolve, reject) => {
    if (action.widget.trigger === "asap") {
      queue.unshift({ action, resolve, reject });
    } else {
      queue.push({ action, resolve, reject });
    }
    processQueue();
  });
}

module.exports = function push(action) {
  const { create } = actionTypes[action.type] || {};

  if (!create) {
    return Promise.reject(`Undefined action type: ${action.type}`);
  }

  action = create(action);

  io.emit("actions.push", action);

  if (action.widget.trigger === "immediat") {
    return sendAction(action);
  }

  return pushAction(action);
};
