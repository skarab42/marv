import { writable } from "svelte/store";
import api from "@/api/twitch";

export const userState = writable(null);
export const store = writable(null);
export const stream = writable(null);
export const user = writable(null);
export const error = writable(null);
export const chat = writable(null);
export const pubsub = writable(null);
export const commands = writable([]);
export const rewards = writable([]);
export const followers = writable([]);

let loaded = false;

async function loadOnce() {
  if (loaded) return;

  api.on("state.userState", userState.set);
  api.on("state.stream", stream.set);
  api.on("state.pubsub", pubsub.set);
  api.on("state.error", error.set);
  api.on("state.user", user.set);
  api.on("state.chat", chat.set);

  api.on("addCommand", (command) => {
    commands.update((state) => {
      return [command, ...state];
    });
  });

  api.on("updateCommand", (command) => {
    commands.update((state) => {
      return state.map((cmd) =>
        cmd.id === command.id ? { ...cmd, ...command } : cmd
      );
    });
  });

  api.on("removeCommand", (command) => {
    commands.update((state) => {
      return state.filter((cmd) => cmd.id !== command.id);
    });
  });

  loaded = true;
}

export default async function load() {
  store.set(await api.getSettings());

  const state = await api.getState();

  userState.set(state.userState);
  stream.set(state.stream);
  pubsub.set(state.pubsub);
  error.set(state.error);
  user.set(state.user);
  chat.set(state.chat);

  commands.set(await api.getCommandList());

  if (state.user) {
    if (state.user.broadcaster_type.length) {
      api.getRewardList().then((state) => rewards.set(state));
    }
    api.getLastFollowers().then((state) => followers.set(state));
  }

  await loadOnce();
}
