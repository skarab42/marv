import { writable } from "svelte/store";
import api from "@/api/command";

export const command = writable(null);

export default async function load() {
  command.set(await api.getSettings());
}
