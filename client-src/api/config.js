import { socketEmitPromise } from "../libs/socket.io";

export default {
  get: (key, val = null) => socketEmitPromise("config.get", key, val)
};
