import { emit } from "@/libs/socket.io";

export default {
  getOS: () => emit("app.getOS"),
  getFonts: () => emit("app.getFonts"),
  set: (key, val) => emit("stores.app", "set", key, val),
};
