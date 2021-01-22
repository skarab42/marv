#!/usr/bin/env node

"use strict";

const sirv = require("sirv");
const http = require("http");
const polka = require("polka");
const umzug = require("./db/umzug");
const { json } = require("body-parser");
const socket = require("./libs/socket.io");
const settings = require("./libs/settings");
const { getServerURL } = require("./utils");
const { getSystemFonts } = require("./libs/files");
const { init: i18next } = require("./libs/i18next");
const { init: twitchInit } = require("./libs/twitch");
const missingKeyHandler = require("./libs/i18next/missingKeyHandler");
const { uploadPath, clientPath, staticPath, fingerprint } = require("../utils");

const staticPaths = [clientPath, staticPath, uploadPath];

let portChangeCount = 0;
let portChangeMaxCount = 10;

async function printBanner() {
  // eslint-disable-next-line no-console
  console.log(`> ${fingerprint} | running on ${await getServerURL()}`);
}

async function onError(error) {
  const EADDRINUSE = error.message.includes("EADDRINUSE");
  if (!EADDRINUSE || portChangeCount >= portChangeMaxCount) {
    throw error;
  }
  let port = await settings.get("server.port");
  await settings.set("server.port", (port += 1));
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
  const api = require("./api/twitch");
  await api.login();
}

function uriDecode(req, res, next) {
  req.path = decodeURI(req.path);
  next();
}

function onStarted() {
  if (typeof process.send === "function") {
    process.send("started");
  }
}

async function start() {
  await umzug.up();
  await i18next();
  await twitchInit();

  let port = await settings.get("server.port");

  const server = http.createServer();

  server.on("error", onError);

  const p = polka({ server }).use(json()).use(uriDecode);

  const { fontPaths } = await getSystemFonts();
  [...staticPaths, ...fontPaths].forEach((path) => {
    p.use(sirv(path, { dev: true }));
  });

  p.use(require("./libs/twitch/authMiddleware"))
    .post("/locales/add/:lng/:ns", missingKeyHandler)
    .listen(port, async (error) => {
      if (error) return onError(error);
      const origins = [await getServerURL()];
      await socket(server, origins);
      twitchAutoConnect();
      obsAutoConnect();
      printBanner();
      onStarted();
    });
}

start();
