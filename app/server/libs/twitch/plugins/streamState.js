const state = require("../state");
const retry = require("../retry");
const { _ } = require("../../i18next");
const appApi = require("../../../api/app");
const getStreamByChannel = require("../api/getStreamByChannel");

module.exports = async function streamStatePlugin({ delay = 10 } = {}) {
  try {
    const channel = state.get("user.display_name");
    const stream = await retry(() => getStreamByChannel(channel));
    setTimeout(streamStatePlugin, delay * 1000);
    state.set("stream", stream);
  } catch (error) {
    appApi.stateNotify("error", _("errors.unable_to_fetch_stream_state"));
  }
};
