import io from "socket.io-client";

const socket = io("/overlay", {
  transports: ["websocket"],
  upgrade: false,
});

socket.on("actions.start", (action, cb) => {
  setTimeout(() => {
    if (Math.random() > 0.5) cb({ error: "Fake error message", action });
    else cb({ success: true, action });
  }, 2000);
});
