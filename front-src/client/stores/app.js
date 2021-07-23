import { readable, writable } from "svelte/store";
import { name, version } from "../../../package";
import capitalize from "capitalize";
import { notify } from "./notify";
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

  notify("info", "Duration 2 seconds", { duration: 2000 });
  notify("success", "Duration 4 seconds", { duration: 4000 });
  notify("info", "Duration 2 seconds", { duration: 6000 });
  notify("success", "Duration 4 seconds", { duration: 8000 });
  notify("info", "Duration 2 seconds", { duration: 10000 });

  api.on("notice", ({ type, message, options }) => {
    notify(type, message, options);
  });
}
