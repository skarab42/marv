import { emit } from "@/libs/socket.io";

export default {
  getConfig: () => emit("i18next.getConfig"),
  changeLanguage: (language) => emit("i18next.changeLanguage", language),
};
