#!/usr/bin/env node

"use strict";

const config = require("../config");
const socket = require("./socket");
const polka = require("polka");
const sirv = require("sirv");

const sirvClient = sirv(config.server.clientPath, { dev: true });
const sirvStatic = sirv(config.server.staticPath, { dev: true });

function fingerprint() {
  /* eslint-disable no-console */
  console.log(`${config.app.fingerprint}`);
  console.log(`running on ${config.server.host}:${config.server.port}`);
  /* eslint-enable no-console */
}

const { server } = polka()
  .use(sirvClient)
  .use(sirvStatic)
  .listen(config.server.port, error => {
    if (error) throw error;
    socket(server);
    fingerprint();
  });
