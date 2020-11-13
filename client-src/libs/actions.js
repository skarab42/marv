import api from "@/api/actions";

function push(action) {
  return api.push(action);
}

function on(eventName, cb) {
  return api.on(eventName, cb);
}

export { push, on };
