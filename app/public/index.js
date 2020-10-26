"use strict";

// eslint-disable-next-line no-console
console.log("index.js....");

const socket = io();

socket.on("connect", () => {
  console.log("connected...");
});

socket.on("disconnect", () => {
  console.log("disconnected...");
});
