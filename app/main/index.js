"use strict";

const mainWindow = require("./window/mainWindow");
const { app } = require("electron");
const server = require("./server");
const store = require("../stores");
const tray = require("./tray");

function preloadMainWindow() {
  mainWindow({ showOnLoad: store.app.get("openOnStartup") });
}

function init() {
  app.on("window-all-closed", (event) => {
    event.preventDefault();
  });

  app.whenReady().then(() => {
    server.start(preloadMainWindow);
    tray();
  });
}

app.requestSingleInstanceLock() ? init() : app.quit();
