const { LogLevel, Logger } = require("@d-fischer/logger");
const { watch, logsPath } = require("../../../utils");
const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");

let locked = false;
let queue = [];

const maxLines = 500;
const logFile = path.join(logsPath, "twitch.log");
const minLogLevel = watch ? LogLevel.DEBUG : LogLevel.WARNING;
const colors = [chalk.red, chalk.red, chalk.orange, chalk.blue, chalk.white];

fs.ensureFileSync(logFile);

function getLogs() {
  const text = fs.readFileSync(logFile);
  return text.toString().split("\n");
}

function writeLogs(logs) {
  if (locked) {
    queue.unshift(logs);
    return;
  }

  locked = true;

  fs.writeFileSync(logFile, logs.slice(0, maxLines).join("\n"));

  if (queue.length) {
    fs.writeFileSync(
      logFile,
      [...queue, ...logs].slice(0, maxLines).join("\n")
    );
    queue = [];
  }

  locked = false;
}

function push(line) {
  writeLogs([line, ...getLogs()]);
}

Logger.prototype.log = function (level, message) {
  if (level > minLogLevel) return;

  const levelName = LogLevel[level];
  const date = new Date().toISOString();
  const line = `[${date}] [${levelName}] [${this._name}] ${message}`;

  push(line);

  if (watch && level < LogLevel.INFO) {
    const color = colors[level] || colors[colors.length - 1];
    // eslint-disable-next-line no-console
    console.log(color(line));
  }
};
