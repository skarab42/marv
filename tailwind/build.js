#!/usr/bin/env node

"use strict";

const tailwind = require.resolve("tailwindcss/lib/cli.js");
const { fork } = require("child_process");
const chalk = require("chalk");
const path = require("path");

const colors = new chalk.Instance({ level: 3 });
const config = path.resolve(__dirname, "config.js");
const input = path.resolve(__dirname, "index.css");
const output = path.resolve(__dirname, "../app/static/css/tailwind.css");
const argv = [...process.argv.slice(2), "--no-autoprefixer"];
const args = ["build", input, "-c", config, "-o", output, ...argv];

function build() {
  fork(tailwind, args, { stdio: ["inherit", "inherit", "inherit", "ipc"] });
}

build();

if (!process.argv.includes("--prod")) {
  const icon = colors.green("↺");
  const chokidar = require("chokidar");
  const watcher = chokidar.watch(__dirname);
  const rootPath = path.resolve(__dirname, "../..");

  watcher.on("ready", () => {
    watcher.on("change", (source) => {
      // eslint-disable-next-line no-console
      console.log(`${icon} file changed: ${path.relative(rootPath, source)}`);
      build();
    });
  });
}
