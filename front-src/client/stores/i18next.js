import { writable } from "svelte/store";
import { emit } from "@/libs/socket.io";
import { i18next } from "@/libs/i18next";

export let store = writable(null);

export function update(props) {
  store.update((state) => {
    return { ...state, ...props };
  });
}

export default async function load() {
  const state = await emit("i18next.getConfig");
  store.set(state);
  return state;
}

export async function changeLanguage(language) {
  await emit("i18next.changeLanguage", language);
  await i18next.changeLanguage(language);
  update({ lng: language });
}
