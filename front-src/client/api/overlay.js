import { emit, on } from "@/libs/socket.io";

export default {
  isConnected: () => emit("overlay.isConnected"),
  on: (eventName, callback) => on(`overlay.${eventName}`, callback),
};
