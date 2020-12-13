#!/usr/bin/env node

"use strict";

const sirv = require("sirv");
const http = require("http");
const polka = require("polka");
const stores = require("../stores");
const umzug = require("./db/umzug");
const { json } = require("body-parser");
const twitch = require("./libs/twitch");
const socket = require("./libs/socket.io");
const { getServerURL } = require("./utils");
const { i18next } = require("./libs/i18next");
const { getSystemFonts } = require("./libs/files");
const { init: i18next } = require("./libs/i18next");
const twitchAuthMiddleware = require("./libs/twitch/authMiddleware");
const missingKeyHandler = require("./libs/i18next/missingKeyHandler");

const { uploadPath, clientPath, staticPath, fingerprint } = require("../utils");

let port = stores.server.get("port");

const staticPaths = [clientPath, staticPath, uploadPath];

let portChangeCount = 0;
let portChangeMaxCount = 10;

function printBanner() {
  // eslint-disable-next-line no-console
  console.log(`> ${fingerprint} | running on ${getServerURL()}`);
}

function onError(error) {
  const EADDRINUSE = error.message.includes("EADDRINUSE");
  if (!EADDRINUSE || portChangeCount >= portChangeMaxCount) {
    throw error;
  }
  stores.server.set("port", (port += 1));
  portChangeCount++;
  start();
}

function obsAutoConnect() {
  if (!stores.obs.get("connectOnStartup")) return;
  const { connect } = require("./libs/obs");
  connect();
}

function twitchAutoConnect() {
  if (!stores.twitch.get("connectOnStartup")) return;
  const api = require("./api/twitch");
  api.login();
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

  const server = http.createServer();

  server.on("error", onError);

  const p = polka({ server }).use(json()).use(uriDecode);

  const { fontPaths } = await getSystemFonts();
  [...staticPaths, ...fontPaths].forEach((path) => {
    p.use(sirv(path, { dev: true }));
  });

  p.use(twitchAuthMiddleware)
    .post("/locales/add/:lng/:ns", missingKeyHandler)
    .listen(port, (error) => {
      if (error) return onError(error);
      socket(server);
      twitchAutoConnect();
      obsAutoConnect();
      printBanner();
      onStarted();
    });
}

start();
