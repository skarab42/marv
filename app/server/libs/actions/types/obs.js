const createAction = require("../create");
const obs = require("../../obs");

function create(action) {
  return createAction(action);
}

function send(action) {
  return obs.send(action.data.eventName, action.data.args);
}

module.exports = { create, send };
