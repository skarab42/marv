import api from "@/api/twitch";

export function on(eventName, cb) {
  return api.on(eventName, cb);
}

export function login(email = false) {
  return api.login(email);
}

export function getState() {
  return api.getState();
}

export function getStore() {
  return api.getStore();
}

export function updateState(state) {
  return api.updateState(state);
}
