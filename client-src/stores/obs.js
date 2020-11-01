import { writable } from "svelte/store";
import obs from "@/api/obs";

export const connected = writable(false);
export const connecting = writable(false);

function setStatus(status) {
  connected.set(status.connected);
  connecting.set(status.connecting);
}

function setConnect() {
  connecting.set(true);
}

function setConnected() {
  setStatus({ connected: true, connecting: false });
}

function setDisconnected() {
  setStatus({ connected: false, connecting: false });
}

obs.on("status", setStatus);
obs.on("connect", setConnect);
obs.on("connected", setConnected);
obs.on("disconnected", setDisconnected);

// sync main <-> renderer store
obs.getStatus().then(setStatus);
