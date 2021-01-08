import { writable } from "svelte/store";
import api from "@/api/files";

export const store = writable([]);

let loaded = false;

function onAdd(file) {
  store.update((state) => [file, ...state]);
}

function onRemove(file) {
  store.update((state) => state.filter((f) => f.filename !== file.filename));
}

function loadOnce() {
  if (loaded) return;
  api.on("add", onAdd);
  api.on("remove", onRemove);
  loaded = true;
}

export default async function load() {
  store.set(await api.getFileList());
  loadOnce();
}
