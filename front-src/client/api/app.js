import { emit, on } from "@/libs/socket.io";

export default {
  quit: () => emit("app.quit"),
  getOS: () => emit("app.getOS"),
  getFonts: () => emit("app.getFonts"),
  loadFont: (url) => emit("app.loadFont", url),
  getUsedFonts: () => emit("app.getUsedFonts"),
  getSettings: () => emit("app.getSettings"),
  setSetting: (key, value) => emit("app.setSetting", key, value),
  on: (key, cb) => on(`app.${key}`, cb),
};
