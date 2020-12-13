import { writable } from "svelte/store";
import api from "@/api/actions";

export const store = writable({});

export default async function load() {
  store.set(await api.getState());
  api.on("state", store.set);
}
