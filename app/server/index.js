#!/usr/bin/env node

"use strict";

const { appPath, userPaths } = require("../stores/utils");
const socket = require("./libs/socket.io");
const { json } = require("body-parser");
const stores = require("../stores");
const polka = require("polka");
const sirv = require("sirv");
const http = require("http");
const path = require("path");

const { i18next } = require("./libs/i18next");
const missingKeyHandler = require("./libs/i18next/missingKeyHandler");

let { host, port } = stores.server.getAll();
const appFingerprint = stores.app.get("fingerprint");

const clientPath = path.join(appPath, "client");
const staticPath = path.join(appPath, "static");
const uploadPath = path.join(userPaths.data, "files");

const sirvClient = sirv(clientPath, { dev: true });
const sirvStatic = sirv(staticPath, { dev: true });
const sirvUpload = sirv(path.dirname(uploadPath), { dev: true });

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

function start() {
  const server = http.createServer();

  server.on("error", onError);

  polka({ server })
    .use(json())
    .use(sirvClient)
    .use(sirvStatic)
    .use(sirvUpload)
    .post("/locales/add/:lng/:ns", missingKeyHandler(i18next))
    .listen(port, (error) => {
      if (error) return onError(error);
      socket(server);
      obsAutoConnect();
      printBanner();
    });
}

start();
