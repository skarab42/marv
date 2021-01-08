import { name, version } from "../../../package";
import { readable, writable } from "svelte/store";
import capitalize from "capitalize";
import api from "@/api/app";

const query = new URLSearchParams(location.search);

export const store = writable(null);
export const initialized = writable(false);
export const repo = readable("skarab42/marv");
export const siteURL = readable(`https://marv-site.web.app/`);
export const fingerprint = capitalize(`${name} - v${version}`);
export const electron = query.has("electron");

export default async function load() {
  store.set(await api.getSettings());
}
