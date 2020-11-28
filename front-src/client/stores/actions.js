import { writable } from "svelte/store";
import { on, getState } from "@/libs/actions";

export const store = writable({});

export default async function load() {
  store.set(await getState());
  on("state", store.set);
}
