import { emit } from "@/libs/socket.io";

export default {
  getSettings: () => emit("command.getSettings"),
  setPrefix: (prefix) => emit("command.setPrefix", prefix),
};
