import { writable } from "svelte/store";
import api from "@/libs/panels";

export const panels = writable([]);

let loaded = false;

function loadOnce() {
  if (loaded) return;

  api.on("add", (panel, event) => {
    console.log("add:", { panel, event });
  });

  loaded = true;
}

export default async function load() {
  const store = await api.getStore();
  panels.set(store.panels);
  loadOnce();
}
