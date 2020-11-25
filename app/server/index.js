#!/usr/bin/env node

"use strict";

const sirv = require("sirv");
const http = require("http");
const polka = require("polka");
const stores = require("../stores");
const { json } = require("body-parser");
const twitch = require("./libs/twitch");
const socket = require("./libs/socket.io");
const { i18next } = require("./libs/i18next");
const { uploadPath, clientPath, staticPath } = require("../utils");
const twitchAuthMiddleware = require("./libs/twitch/authMiddleware");
const missingKeyHandler = require("./libs/i18next/missingKeyHandler");

require("./libs/twitch/logs");

let { host, port } = stores.server.getAll();
const appFingerprint = stores.app.get("fingerprint");

const sirvClient = sirv(clientPath, { dev: true });
const sirvStatic = sirv(staticPath, { dev: true });
const sirvUpload = sirv(uploadPath, { dev: true });

let portChangeCount = 0;
let portChangeMaxCount = 10;

function printBanner() {
  const serverURL = `http://${host}:${port}`;
  // eslint-disable-next-line no-console
  console.log(`> ${appFingerprint} | running on ${serverURL}`);
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

function start() {
  const server = http.createServer();

  server.on("error", onError);

  polka({ server })
    .use(json())
    .use(sirvClient)
    .use(sirvStatic)
    .use(sirvUpload)
    .use(twitchAuthMiddleware(twitch.authProvider))
    .post("/locales/add/:lng/:ns", missingKeyHandler(i18next))
    .listen(port, (error) => {
      if (error) return onError(error);
      socket(server);
      twitchAutoConnect();
      obsAutoConnect();
      printBanner();
    });
}

start();
