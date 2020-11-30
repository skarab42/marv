import { getStore, getState, on } from "@/libs/twitch";
import { writable } from "svelte/store";
import api from "@/api/twitch";

export const store = writable(null);
export const stream = writable(null);
export const user = writable(null);
export const chat = writable(null);
export const commands = writable(null);

let loaded = false;

function loadOnce() {
  if (loaded) return;

  on("state.stream", stream.set);
  on("state.user", user.set);
  on("state.chat", chat.set);

  on("addCommand", (command) => {
    commands.update((state) => {
      return [command, ...state];
    });
  });

  on("removeCommand", (command) => {
    commands.update((state) => {
      return state.filter((cmd) => cmd.id !== command.id);
    });
  });

  api.getCommandList().then(commands.set);

  loaded = true;
}

export default async function load() {
  store.set(await getStore());
  const state = await getState();
  stream.set(state.stream);
  user.set(state.user);
  chat.set(state.chat);
  loadOnce();
}
