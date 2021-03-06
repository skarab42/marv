#!/usr/bin/env node

"use strict";

const sirv = require("sirv");
const http = require("http");
const polka = require("polka");
const umzug = require("./db/umzug");
const { json } = require("body-parser");
const loggers = require("./libs/loggers");
const socket = require("./libs/socket.io");
const settings = require("./libs/settings");
const { getServerURL } = require("./utils");
const migrateStore = require("../stores/migrate");
const { getSystemFonts } = require("./libs/files");
const errorHandler = require("./libs/errorHandler");
const { init: i18next } = require("./libs/i18next");
const { init: twitchInit } = require("./libs/twitch");
const missingKeyHandler = require("./libs/i18next/missingKeyHandler");
const { uploadPath, clientPath, staticPath, fingerprint } = require("../utils");

errorHandler.init();

const logger = loggers.get("server");
const staticPaths = [clientPath, staticPath, uploadPath];

let portChangeCount = 0;
let portChangeMaxCount = 10;

async function printBanner() {
  logger.info(`${fingerprint} | Running on ${await getServerURL()}`);
}

async function onError(error) {
  const EADDRINUSE = error.message.includes("EADDRINUSE");
  if (!EADDRINUSE || portChangeCount >= portChangeMaxCount) {
    throw error;
  }
  let port = await settings.get("server.port");
  await settings.set("server.port", (port += 1));
  logger.warn(`Port changed -> ${port}`);
  portChangeCount++;
  start();
}

async function obsAutoConnect() {
  if (!(await settings.get("obs.connectOnStartup"))) return;
  const { connect } = require("./libs/obs");
  connect();
}

async function twitchAutoConnect() {
  if (!(await settings.get("twitch.connectOnStartup"))) return;
  try {
    loggers.get("twitch").info("Auto connect");
    const api = require("./api/twitch");
    await api.login();
  } catch (error) {
    const io = socket();
    io.emit("twitch.login.error", { error });
  }
}

function uriDecode(req, res, next) {
  req.path = decodeURI(req.path);
  next();
}

function onStarted() {
  if (typeof process.send === "function") {
    require("./onStart");
  }
}

async function start() {
  logger.info(`Starting...`);

  await umzug.up();
  await i18next();
  await twitchInit();
  await migrateStore.up();

  let port = await settings.get("server.port");

  const server = http.createServer();

  server.on("error", onError);

  const p = polka({ server }).use(json()).use(uriDecode);

  const { fontPaths } = await getSystemFonts();
  [...staticPaths, ...fontPaths].forEach((path) => {
    p.use(sirv(path, { dev: true }));
  });

  p.use(require("./libs/twitch/authMiddleware")())
    .post("/locales/add/:lng/:ns", missingKeyHandler)
    .listen(port, async (error) => {
      if (error) return onError(error);
      await socket(server);
      twitchAutoConnect();
      obsAutoConnect();
      printBanner();
      onStarted();
    });
}

start();
