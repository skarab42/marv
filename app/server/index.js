#!/usr/bin/env node

"use strict";

const socket = require("./libs/socket.io");
const stores = require("../stores");
const polka = require("polka");
const sirv = require("sirv");
const http = require("http");
const { json } = require("body-parser");

const { i18next } = require("./libs/i18next");
const missingKeyHandler = require("./libs/i18next/missingKeyHandler");

let { host, port, clientPath, staticPath } = stores.server.getAll();
const appFingerprint = stores.app.get("fingerprint");

const sirvClient = sirv(clientPath, { dev: true });
const sirvStatic = sirv(staticPath, { dev: true });

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

function start() {
  const server = http.createServer();

  server.on("error", onError);

  polka({ server })
    .use(json())
    .use(sirvClient)
    .use(sirvStatic)
    .post("/locales/add/:lng/:ns", missingKeyHandler(i18next))
    .listen(port, (error) => {
      if (error) return onError(error);
      socket(server);
      printBanner();
    });
}

start();
