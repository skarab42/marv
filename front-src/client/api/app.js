import { emit } from "@/libs/socket.io";

export default {
  getOS: () => emit("app.getOS"),
  getFonts: () => emit("app.getFonts"),
  getUsedFonts: () => emit("app.getUsedFonts"),
  set: (key, val) => emit("stores.app", "set", key, val),
};
