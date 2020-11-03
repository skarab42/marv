"use strict";

const { app } = require("electron");
const server = require("./server");
const tray = require("./tray");

app.requestSingleInstanceLock() || app.quit();

app.on("window-all-closed", (event) => {
  event.preventDefault();
});

app.whenReady().then(() => {
  server.start();
  tray();
});
