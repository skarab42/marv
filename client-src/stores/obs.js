import { writable } from "svelte/store";
import obs from "@/libs/obs";

export const store = writable(null);
export const state = writable(null);

export default async function load() {
  store.set(await obs.getStore());
  state.set(await obs.getState());
  obs.on("state", state.set);
}
