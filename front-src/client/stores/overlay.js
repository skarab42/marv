import { writable } from "svelte/store";
import api from "@/api/overlay";

export const connected = writable(null);

api.on("connected", () => connected.set(true));
api.on("disconnected", () => connected.set(false));

export default async function load() {
  connected.set(await api.isConnected());
}
