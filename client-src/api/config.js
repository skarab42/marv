import { emit } from "../libs/socket.io";

export default {
  get: (key, val = null) => emit("config.get", key, val)
};
