"use strict";

const server = require("./server/process");
const createTray = require("./tray");
const { app } = require("electron");

app.requestSingleInstanceLock() || app.quit();

app.whenReady().then(() => {
  server.start();
  createTray();
});
