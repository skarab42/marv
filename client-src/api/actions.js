import { emit, on } from "@/libs/socket.io";

export default {
  push: (action) => emit("actions.push", action),
  on: (eventName, cb) => on(`actions.${eventName}`, cb),
};
