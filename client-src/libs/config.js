import { socketEmitPromise } from "./socket";

export default {
  get: (key, val = null) => socketEmitPromise("config.get", key, val)
};
