import { writable } from "svelte/store";
import { load as configLoad } from "@/libs/config";

export const config = writable(null);

export async function load() {
  const items = await configLoad();
  config.set(items);
  return items;
}
