import { emit } from "@/libs/socket.io";

export async function load() {
  return await emit("config.load");
}
