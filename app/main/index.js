"use strict";

const { app } = require("electron");
const server = require("./server");

async function onServerReady() {
  const tray = require("./tray");
  const mainWindow = require("./window/mainWindow");
  const settings = require("../server/libs/settings");
  mainWindow({ showOnLoad: await settings.get("app.openOnStartup") });
  tray();
}

function init() {
  app.on("window-all-closed", (event) => {
    event.preventDefault();
  });

  app.whenReady().then(() => {
    server.start(onServerReady);
  });
}

app.requestSingleInstanceLock() ? init() : app.quit();
