const state = require("./state");

const actionTypes = {
  anime: require("./types/anime"),
  obs: require("./types/obs"),
};

const queue = [];
let lock = false;

function sendAction(action, immediat = false) {
  const { send } = actionTypes[action.type] || {};

  state.update("start", { ...action, running: true });

  if (!send) {
    state.decrement(action);
    state.update("end", { ...action, running: false });
    return Promise.reject(`Undefined action type: ${action.type}`);
  }

  return send(action)
    .then((response) => ({ response }))
    .catch((error) => ({ error }))
    .then(({ error, response }) => {
      const newAction = state.decrement(action);
      const running = immediat && !!newAction.inQueue;
      state.update("end", { ...action, ...newAction, running });
      return error || response;
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

  sendAction(action)
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

  if (action.fakeEvent) {
    action.event = { eventName: action.fakeEvent.eventName };
    action.eventProps = action.fakeEvent;
  }

  action.eventProps.eventName = action.event
    ? action.event.eventName
    : "onClick";

  state.push(action);

  if (action.widget.trigger === "immediat") {
    return sendAction(action, true);
  }

  return pushAction(action);
};
