import { emit } from "@/libs/socket.io";

export default {
  getOS: () => emit("app.getOS"),
  set: (key, val) => emit("stores.app", "set", key, val),
};
