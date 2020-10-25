#!/usr/bin/env node

"use strict";

const config = require("../config");
const polka = require("polka");
const sirv = require("sirv");

polka()
  .use(sirv(config.server.path, { dev: true }))
  .listen(config.server.port, error => {
    if (error) throw error;
    /* eslint-disable no-console */
    console.log(`${config.app.fingerprint}`);
    console.log(`running on ${config.server.host}:${config.server.port}`);
    /* eslint-enable no-console */
  });
