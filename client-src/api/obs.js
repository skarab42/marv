import { on, emit } from "@/libs/socket.io";

export default {
  connect: () => emit("obs.connect"),
  disconnect: () => emit("obs.disconnect"),
  getStatus: () => emit("obs.getStatus"),
  on: (eventName, callback) => on(`obs.${eventName}`, callback)
};
