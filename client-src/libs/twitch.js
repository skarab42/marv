import api from "@/api/twitch";

export function on(eventName, cb) {
  return api.on(eventName, cb);
}

export function getMe(email = false) {
  return api.getMe(email);
}

export function getState() {
  return api.getState();
}

export function updateState(state) {
  return api.updateState(state);
}
