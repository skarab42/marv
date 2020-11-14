import { emit, on } from "@/libs/socket.io";

export default {
  get: (id) => emit("actions.get", id),
  push: (action) => emit("actions.push", action),
  update: (anime) => emit(`actions.update`, anime),
  on: (eventName, cb) => on(`actions.${eventName}`, cb),
};
