#!/usr/bin/env node

"use strict";

const config = require("../main/config");
const socket = require("./socket.io");
const polka = require("polka");
const sirv = require("sirv");
const i18n = require("./libs/i18n");
const { json } = require("body-parser");

const sirvClient = sirv(config.server.clientPath, { dev: true });
const sirvStatic = sirv(config.server.staticPath, { dev: true });

function fingerprint() {
  /* eslint-disable no-console */
  console.log(`${config.app.fingerprint}`);
  console.log(`running on ${config.server.host}:${config.server.port}`);
  /* eslint-enable no-console */
}

const { server } = polka()
  .use(json())
  .use(sirvClient)
  .use(sirvStatic)
  .post("/locales/add/:lng/:ns", i18n.missingKeyHandler)
  .listen(config.server.port, error => {
    if (error) throw error;
    socket(server);
    fingerprint();
  });
