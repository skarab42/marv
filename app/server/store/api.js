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

  const nsKey = args.shift() || "";
  const [ns, key] = nsKey.split(".");
  const store = stores[ns];

  if (!store) {
    return callback({ error: `Undefined store ${ns}` });
  }

  const fn = store[method];

  if (typeof fn !== "function") {
    throw new Error("Undefined store method");
  }

  let payload = null;

  if (method === "has") {
    payload = store.has(key);
  } else if (method === "get") {
    payload = key ? store.has(key) : store.store;
  } else if (method === "set") {
    payload = {
      oldValue: store.get(key),
      newValue: args[0]
    };
    key ? store.set(key, args[0]) : (store.store = args[0]);
  } else if (method === "delete") {
    payload = { oldValue: store.get(key) };
    store.delete(key);
  }
  // else if (method === "reset") {
  //   payload = { oldValue: store.get(key) };
  //   store.reset(key);
  //   payload.newValue = store.get(key);
  // } else if (method === "clear") {
  //   payload = true;
  //   store.clear(key);
  // }

  callback({ payload });
  next();
};
