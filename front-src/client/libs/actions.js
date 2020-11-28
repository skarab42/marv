import api from "@/api/actions";

function push(action) {
  return api.push(action);
}

function on(eventName, cb) {
  return api.on(eventName, cb);
}

function update(anime) {
  return api.update(anime);
}

function get(id) {
  return api.get(id);
}

function getState() {
  return api.getState();
}

export { push, on, update, get, getState };
