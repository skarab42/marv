import { getStore, getState, on } from "@/libs/twitch";
import { writable } from "svelte/store";

export const store = writable(null);
export const state = writable(null);

let loaded = false;

function loadOnce() {
  if (loaded) return;

  on("state", state.set);

  loaded = true;
}

export default async function load() {
  store.set(await getStore());
  state.set(await getState());
  loadOnce();
}
