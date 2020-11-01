#!/usr/bin/env node

"use strict";

const socket = require("./socket.io");
const store = require("../store");
const polka = require("polka");
const sirv = require("sirv");
// const i18n = require("./libs/i18n");
const { json } = require("body-parser");

const { host, port, clientPath, staticPath } = store.server.getAll();
const appFingerprint = store.app.get("fingerprint");
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
  // .post("/locales/add/:lng/:ns", i18n.missingKeyHandler)
  .listen(port, error => {
    if (error) throw error;
    socket(server);
    printBanner();
  });
