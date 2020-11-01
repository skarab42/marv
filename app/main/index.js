"use strict";

const { app } = require("electron");
const server = require("./server");
const tray = require("./tray");

app.requestSingleInstanceLock() || app.quit();

app.whenReady().then(() => {
  server.start();
  tray();
});
