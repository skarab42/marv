import { socketEmitPromise } from "./socket";

export default {
  has: key => socketEmitPromise("store.has", key),
  reset: key => socketEmitPromise("store.reset", key),
  delete: key => socketEmitPromise("store.delete", key),
  clear: store => socketEmitPromise("store.clear", store),
  set: (key, val) => socketEmitPromise("store.set", key, val),
  get: (key, val = null) => socketEmitPromise("store.get", key, val)
};
