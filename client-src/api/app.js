import { emit } from "@/libs/socket.io";

export default {
  set: (key, val) => emit("stores.app", "set", key, val),
};
