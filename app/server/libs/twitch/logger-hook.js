const { LogLevel, Logger } = require("@d-fischer/logger");
const { watch } = require("../../../utils");
const loggers = require("../loggers");

const logger = loggers.get("twitch");

const levels = {
  0: "error",
  1: "error",
  2: "warn",
  3: "info",
  4: "debug",
  7: "debug",
};

const minLogLevel = watch ? LogLevel.DEBUG : LogLevel.WARNING;

Logger.prototype.log = function (level, message) {
  if (level > minLogLevel) return;

  const method = levels[level];

  logger[method](`[${this._name}] ${message}`);
};
