import { writable } from "svelte/store";

export const contextKey = Symbol("🦄");
export const selectedWidget = writable(null);
