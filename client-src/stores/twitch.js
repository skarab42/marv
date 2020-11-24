import { writable } from "svelte/store";
import { getState, on } from "@/libs/twitch";

export const store = writable({
  user: null,
});

export default async function load() {
  store.set(await getState());
  on("login", (user) => {
    store.update((store) => ({ ...store, user }));
  });
}
