const state = require("../state");
const getStreamByChannel = require("../api/getStreamByChannel");

module.exports = async function streamStatePlugin({ delay = 10 } = {}) {
  const channel = state.get("user.display_name");
  const stream = await getStreamByChannel(channel);
  state.set("stream", stream);
  setTimeout(streamStatePlugin, delay * 1000);
};
