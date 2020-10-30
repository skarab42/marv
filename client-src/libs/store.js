import { socketEmitPromise } from "./socket";

export default {
  has: key => socketEmitPromise("store.has", key),
  set: (key, val) => socketEmitPromise("store.set", key, val),
  get: (key, val = null) => socketEmitPromise("store.get", key, val),
  delete: key => socketEmitPromise("store.delete", key)
};
