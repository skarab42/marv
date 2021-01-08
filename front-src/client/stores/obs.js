import { writable } from "svelte/store";
import api from "@/api/obs";

export const store = writable(null);
export const state = writable(null);

let loaded = false;

function loadOnce() {
  if (loaded) return;

  api.on("state", state.set);

  loaded = true;
}

export default async function load() {
  store.set(await api.getSettings());
  state.set(await api.getState());
  loadOnce();
}
