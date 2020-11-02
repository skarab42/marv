import { writable } from "svelte/store";
import { emit } from "@/libs/socket.io";

export const store = writable(null);
export const initialized = writable(false);

export default async function load() {
  store.set(await emit("stores.app", "getAll"));
}
