import { writable } from "svelte/store";
import { io } from "@/libs/socket.io";

export const connected = writable(false);

const socket = io();

socket.on("connect", () => {
  connected.set(true);
});

socket.on("disconnect", () => {
  connected.set(false);
});
