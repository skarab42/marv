const { app } = require("electron");
const { fork } = require("child_process");
const { watch } = require("../utils");
const quit = require("./quit");
const chalk = require("chalk");
const path = require("path");

const colors = new chalk.Instance({ level: 3 });
const rootPath = path.resolve(__dirname, "../..");
const serverPath = path.join(__dirname, "../server");
const serverBin = path.join(serverPath, "index.js");

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

function start(onStared = null) {
  if (server) return server;

  const argv = process.argv.slice(2);
  server = fork(serverBin, argv, { stdio: ["pipe", "pipe", "pipe", "ipc"] });

  server.stderr.on("data", stderr);
  server.stdout.on("data", stdout);

  server.on("close", (code) => {
    stdout(`exited with code ${code || 0}`);
    code === 42 && quit();
  });

  onStared &&
    server.on("message", (message) => {
      if (message === "started") onStared();
    });

  app.on("quit", () => stop());
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

if (watch) {
  const icon = colors.green("↺");
  const chokidar = require("chokidar");
  const watcher = chokidar.watch(path.join(serverPath, "**/*"));

  watcher.on("ready", () => {
    watcher.on("change", (source) => {
      stdout(`${icon} file changed: ${path.relative(rootPath, source)}`);
      restart();
    });
  });
}

module.exports = {
  start,
  stop,
  restart,
};
