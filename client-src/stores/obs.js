import { writable } from "svelte/store";
import obs from "@/libs/obs";

export const store = writable(null);
export const state = writable(null);

let loaded = false;

function loadOnce() {
  if (loaded) return;

  obs.on("state", state.set);

  loaded = true;
}

export default async function load() {
  store.set(await obs.getStore());
  state.set(await obs.getState());
  loadOnce();
}
