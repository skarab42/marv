const stores = require("./index");

module.exports = (args, next) => {
  if (!args[0].match(/^store\./)) {
    return next();
  }

  const method = args.shift().slice(6);
  const callback = args.pop();

  if (typeof callback !== "function") {
    throw new Error("Undefined io callback");
  }

  const [ns, key] = args.shift().split(".");
  const store = stores[ns];

  if (!store) {
    return callback({ error: `Undefined store ${ns}` });
  }

  const fn = store[method];

  if (typeof fn !== "function") {
    throw new Error("Undefined store method");
  }

  let payload = true; // clear return true

  if (["has", "get"].includes(method)) {
    payload = fn.call(store, key, ...args);
  } else if (method === "set") {
    payload = {
      oldValue: store.get(key),
      newValue: args[0]
    };
    store.set(key, args[0]);
  } else if (method === "reset") {
    payload = { oldValue: store.get(key) };
    store.reset(key);
    payload.newValue = store.get(key);
  } else if (method === "delete") {
    payload = { oldValue: store.get(key) };
    store.delete(key);
  }

  callback({ payload });
  next();
};
