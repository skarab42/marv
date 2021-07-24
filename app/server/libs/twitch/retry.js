const loggers = require("../../libs/loggers");
const pRetry = require("p-retry");

const logger = loggers.get("app");

module.exports = async function retry(promise, options) {
  return await pRetry(promise, {
    retries: 5,
    ...options,
    onFailedAttempt: (error) => {
      logger.error(error.message, error);
    },
  });
};
