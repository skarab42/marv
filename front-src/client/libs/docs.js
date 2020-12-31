import { store } from "@/stores/app";
import { get } from "svelte/store";

// TODO get from db settings
let docsURL = `http://localhost:3000`;

export const links = [
  { url: "get-started#obs", label: "docs.get-started.obs" },
  { url: "get-started#overlay", label: "docs.get-started.overlay" },
];

export function url(uri) {
  return `${docsURL}/${get(store).language}/docs/${uri}`;
}
