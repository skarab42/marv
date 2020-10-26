#!/usr/bin/env node

"use strict";

const tailwind = require.resolve("tailwindcss/lib/cli.js");
const { fork } = require("child_process");
const path = require("path");

const config = path.resolve(__dirname, "config.js");
const input = path.resolve(__dirname, "index.css");
const output = path.resolve(__dirname, "../app/static/css/tailwind.css");
const argv = [...process.argv.slice(2), "--no-autoprefixer"];
const args = ["build", input, "-c", config, "-o", output, ...argv];

fork(tailwind, args, { stdio: ["inherit", "inherit", "inherit", "ipc"] });
