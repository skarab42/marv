import { writable } from "svelte/store";
import { emit } from "@/libs/socket.io";
import api from "@/api/files";

export const store = writable([]);

let loaded = false;

function onAdd(file) {
  store.update((state) => [...state, file]);
}

function loadOnce() {
  if (loaded) return;
  api.on("add", onAdd);
  loaded = true;
}

export default async function load() {
  store.set(await emit("files.getFileList"));
  loadOnce();
}
