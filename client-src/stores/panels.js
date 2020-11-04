import { writable } from "svelte/store";
import api from "@/libs/panels";

export const panels = writable([]);

let loaded = false;

function loadOnce() {
  if (loaded) return;

  api.on("add", (...args) => {
    console.log("add:", args);
  });

  loaded = true;
}

export default async function load() {
  const store = await api.getStore();
  panels.set(store.panels);
  loadOnce();
}
