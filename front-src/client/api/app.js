import { emit } from "@/libs/socket.io";

export default {
  getOS: () => emit("app.getOS"),
  getFonts: () => emit("app.getFonts"),
  loadFont: (url) => emit("app.loadFont", url),
  getUsedFonts: () => emit("app.getUsedFonts"),
  set: (key, val) => emit("stores.app", "set", key, val),
};
