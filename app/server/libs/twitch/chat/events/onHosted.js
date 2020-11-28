const pushActions = require("../../pushActions");

module.exports = function onHosted(channel, byChannel, auto, viewers) {
  console.log(">>> hosted:", { channel, byChannel, auto, viewers });
  pushActions("hosted", { channel: byChannel, viewerCount: viewers || "???" });
};
