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

export { push, on, update, get };
