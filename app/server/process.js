const { fork } = require("child_process");
const config = require("../config");
const chalk = require("chalk");
const path = require("path");

const colors = new chalk.Instance({ level: 2 });
const appPath = path.resolve(__dirname, "../..");

let server = null;

function bufferToString(buffer) {
  return (Buffer.isBuffer(buffer) ? buffer.toString() : buffer).trim();
}

function stdout(buffer) {
  // eslint-disable-next-line no-console
  console.log(colors.cyanBright("[server]"), bufferToString(buffer));
}

function stderr(buffer) {
  // eslint-disable-next-line no-console
  console.error(colors.redBright("[server]"), bufferToString(buffer));
}

function start() {
  if (server) return server;

  server = fork(path.join(__dirname, "index.js"), [], { stdio: "pipe" });

  server.stderr.on("data", stderr);
  server.stdout.on("data", stdout);

  server.on("close", code => {
    stdout(`exited with code ${code || 0}`);
  });
}

function restart() {
  stop();
  start();
}

function stop() {
  if (!server) return;

  server.stdin.pause();
  server.kill();

  server = null;
}

if (config.watch) {
  const icon = colors.green("↺");
  const chokidar = require("chokidar");
  const watcher = chokidar.watch(path.join(__dirname, "**/*"));

  watcher.on("ready", () => {
    watcher.on("change", source => {
      stdout(`${icon} file changed: ${path.relative(appPath, source)}`);
      restart();
    });
  });
}

module.exports = {
  start,
  stop,
  restart
};
