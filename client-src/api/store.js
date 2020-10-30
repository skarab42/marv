import { emit } from "@/libs/socket.io";

export default {
  has: key => emit("store.has", key),
  set: (key, val) => emit("store.set", key, val),
  get: (key, val = null) => emit("store.get", key, val),
  delete: key => emit("store.delete", key)
};
