import { getStore, getState, on } from "@/libs/twitch";
import { writable } from "svelte/store";
import api from "@/api/twitch";

export const store = writable(null);
export const stream = writable(null);
export const user = writable(null);
export const chat = writable(null);
export const commands = writable([]);
export const rewards = writable([]);
export const followers = writable([]);

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

  loaded = true;
}

export default async function load() {
  store.set(await getStore());

  const state = await getState();

  stream.set(state.stream);
  user.set(state.user);
  chat.set(state.chat);

  commands.set(await api.getCommandList());

  if (state.user) {
    if (state.user.broadcaster_type.length) {
      rewards.set(await api.getRewardList());
    }
    followers.set(await api.getLastFollowers());
  }

  await loadOnce();
}
