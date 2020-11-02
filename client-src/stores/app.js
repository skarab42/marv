import { writable } from "svelte/store";
import { emit } from "@/libs/socket.io";

export let app = writable(null);

export default async function load() {
  app.set(await emit("stores.app", "getAll"));
}
