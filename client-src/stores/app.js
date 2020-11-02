import { writable } from "svelte/store";
import { emit } from "@/libs/socket.io";

export const app = writable(null);
export const initialized = writable(false);

export default async function load() {
  app.set(await emit("stores.app", "getAll"));
}
