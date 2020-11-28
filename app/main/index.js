"use strict";

const mainWindow = require("./window/mainWindow");
const { app } = require("electron");
const server = require("./server");
const store = require("../stores");
const tray = require("./tray");

function init() {
  app.on("window-all-closed", (event) => {
    event.preventDefault();
  });

  app.whenReady().then(() => {
    server.start();
    mainWindow({ showOnLoad: store.app.get("openOnStartup") });
    tray();
  });
}

app.requestSingleInstanceLock() ? init() : app.quit();
