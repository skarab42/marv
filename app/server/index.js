#!/usr/bin/env node

"use strict";

const socket = require("./libs/socket.io");
const stores = require("../stores");
const polka = require("polka");
const sirv = require("sirv");
const { json } = require("body-parser");

const { i18next } = require("./libs/i18next");
const missingKeyHandler = require("./libs/i18next/missingKeyHandler");

const { host, port, clientPath, staticPath } = stores.server.getAll();
const appFingerprint = stores.app.get("fingerprint");
const serverURL = `http://${host}:${port}`;

const sirvClient = sirv(clientPath, { dev: true });
const sirvStatic = sirv(staticPath, { dev: true });

function printBanner() {
  // eslint-disable-next-line no-console
  console.log(`> ${appFingerprint} | running on ${serverURL}`);
}

const { server } = polka()
  .use(json())
  .use(sirvClient)
  .use(sirvStatic)
  .post("/locales/add/:lng/:ns", missingKeyHandler(i18next))
  .listen(port, (error) => {
    if (error) throw error;
    socket(server);
    printBanner();
  });
