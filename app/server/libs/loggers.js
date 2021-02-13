const { format, transports, loggers } = require("winston");
const { watch, logsPath } = require("../../utils");

require("winston-daily-rotate-file");

const { combine, printf, timestamp, colorize, label } = format;

const fileFormat = combine(
  timestamp({ format: "YY-MM-DD HH:MM:SS" }),
  printf(({ timestamp, label, level, message, ...rest }) => {
    const data = Object.keys(rest).length ? JSON.stringify(rest) : "";
    return `[${timestamp}][${label}][${level}] ${message} ${data}`;
  })
);

const consoleFormat = combine(
  printf(({ label, level, message, ...rest }) => {
    const data = Object.keys(rest).length ? JSON.stringify(rest) : "";
    return `[${level}][${label}] ${message} ${data}`;
  })
);

function createLogger({ group, console = false } = {}) {
  const logger = loggers.add(group, {
    transports: [
      new transports.DailyRotateFile({
        filename: `${group}-%DATE%.log`,
        format: combine(label({ label: group }), fileFormat),
        dirname: logsPath,
        maxSize: "42m",
        maxFiles: "7d",
      }),
    ],
  });

  console &&
    logger.add(
      new transports.Console({
        level: "info",
        format: combine(label({ label: group }), colorize(), consoleFormat),
      })
    );

  return logger;
}

createLogger({ group: "server", console: watch });
createLogger({ group: "twitch", console: false });
createLogger({ group: "obs", console: watch });

module.exports = loggers;
