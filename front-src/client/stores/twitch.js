import { getStore, getState, on } from "@/libs/twitch";
import { writable } from "svelte/store";
import api from "@/api/twitch";

export const store = writable(null);
export const stream = writable(null);
export const user = writable(null);
export const chat = writable(null);
export const commands = writable(null);
export const rewards = writable(null);

let loaded = false;

async function loadOnce() {
  if (loaded) return;

  on("state.stream", stream.set);
  on("state.user", user.set);
  on("state.chat", chat.set);

  on("addCommand", (command) => {
    commands.update((state) => {
      return [command, ...state];
    });
  });

  on("updateCommand", (command) => {
    commands.update((state) => {
      return state.map((cmd) =>
        cmd.id === command.id ? { ...cmd, ...command } : cmd
      );
    });
  });

  on("removeCommand", (command) => {
    commands.update((state) => {
      return state.filter((cmd) => cmd.id !== command.id);
    });
  });

  const _commands = await api.getCommandList();
  const _rewards = await api.getRewardList();

  commands.set(_commands);
  rewards.set(_rewards);

  loaded = true;
}

export default async function load() {
  store.set(await getStore());
  const state = await getState();
  stream.set(state.stream);
  user.set(state.user);
  chat.set(state.chat);
  await loadOnce();
}
