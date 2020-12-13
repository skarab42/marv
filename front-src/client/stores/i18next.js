import { writable } from "svelte/store";
import { i18next } from "@/libs/i18next";
import api from "@/api/i18next";

export let store = writable(null);

export function update(props) {
  store.update((state) => {
    return { ...state, ...props };
  });
}

export default async function load() {
  const state = await api.getConfig();
  store.set(state);
  return state;
}

export async function changeLanguage(language) {
  await i18next.changeLanguage(language);
  await api.changeLanguage(language);
  update({ lng: language });
}
