const { i18next } = require("../libs/i18n");
const store = require("../store");

module.exports = async (args, next) => {
  if (!args[0].match(/^i18n\./)) {
    return next();
  }

  const key = args.shift().slice(5);
  const callback = args.pop() || function() {};

  if (callback && typeof callback !== "function") {
    throw new Error("socket.io callback must be a function");
  }

  if (key === "changeLanguage") {
    try {
      const language = args[0];
      await store.app.set("lang", language);
      await i18next.changeLanguage(language);
      callback({ payload: language });
    } catch (error) {
      callback({ error });
    }
  }
};
