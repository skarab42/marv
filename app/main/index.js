"use strict";

const { app, globalShortcut } = require("electron");
const server = require("./server");

let mainWindow;

function registerGlobalShortcut(accelerator, id = null) {
  const result = globalShortcut.register(accelerator, () => {
    server.send({ type: "shortcut", accelerator });
  });
  server.send({ type: "registerGlobalShortcut", data: { id, result } });
  return result;
}

function registerGlobalShortcuts(shortcuts) {
  shortcuts.forEach(registerGlobalShortcut);
}

function onRegisterShortcut({ accelerator, id }) {
  return registerGlobalShortcut(accelerator, id);
}

function onUnregisterShortcut({ shortcuts }) {
  globalShortcut.unregisterAll();
  registerGlobalShortcuts(shortcuts);
}

async function onServerReady(serverState) {
  const tray = require("./tray");
  const win = require("./window/mainWindow");
  const settings = require("../server/libs/settings");
  mainWindow = await win({
    showOnLoad: await settings.get("app.openOnStartup"),
  });
  registerGlobalShortcuts(serverState.shortcuts);
  tray();
}

function init() {
  app.on("window-all-closed", (event) => {
    event.preventDefault();
  });

  app.whenReady().then(() => {
    server.start({ onServerReady, onRegisterShortcut, onUnregisterShortcut });
  });
}

function onQuit() {
  globalShortcut.unregisterAll();
  server.stop();
}

app.requestSingleInstanceLock() ? init() : app.quit();
app.on("second-instance", () => mainWindow.show());

app.on("quit", onQuit);

process.on("SIGINT", onQuit);
process.on("SIGTERM", onQuit);
