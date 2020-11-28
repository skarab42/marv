import { getStore, getState, on } from "@/libs/twitch";
import { writable } from "svelte/store";

export const store = writable(null);
export const stream = writable(null);
export const user = writable(null);
export const chat = writable(null);

let loaded = false;

function loadOnce() {
  if (loaded) return;

  on("state.stream", stream.set);
  on("state.user", user.set);
  on("state.chat", chat.set);

  loaded = true;
}

export default async function load() {
  store.set(await getStore());
  const state = await getState();
  stream.set(state.stream);
  user.set(state.user);
  chat.set(state.chat);
  loadOnce();
}
