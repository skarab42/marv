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

function onUpdate({ files }) {
  store.set(files);
}

function loadOnce() {
  if (loaded) return;
  api.on("add", onAdd);
  api.on("remove", onRemove);
  api.on("update", onUpdate);
  loaded = true;
}

export async function refresh() {
  store.set(await api.getFileList());
}

export default async function load() {
  refresh();
  loadOnce();
}
