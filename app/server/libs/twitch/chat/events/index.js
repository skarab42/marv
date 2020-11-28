const twitch = require("../../index");

twitch.chat.onRaid(require("./onRaid"));
twitch.chat.onHosted(require("./onHosted"));
twitch.chat.onMessage(require("./onMessage"));
