const { BasicPubSubClient, PubSubClient } = require("twitch-pubsub-client");
const onRedemption = require("./onRedemption");
const onBits = require("./onBits");
const twitch = require("../index");
const state = require("../state");

let connectId = null;
const reconnectDelay = 5; // seconds

const rootClient = new BasicPubSubClient();
const pubSubClient = new PubSubClient(rootClient);

function delayConnect() {
  connectId && clearTimeout(connectId);
  connectId = setTimeout(reconnect, reconnectDelay * 1000);
}

function reconnect() {
  state.set("pubsub.connected", false);
  rootClient
    .reconnect()
    .then(() => {
      state.set("pubsub.connected", true);
    })
    .catch(() => {
      delayConnect();
    });
}

rootClient.onDisconnect((manually) => {
  state.set("pubsub.connected", false);
  if (!manually) delayConnect();
});

module.exports = async function init() {
  state.set("pubsub.connected", false);

  const userId = await pubSubClient.registerUserListener(twitch.api);

  await pubSubClient.onRedemption(userId, onRedemption);
  await pubSubClient.onBits(userId, onBits);

  state.set("pubsub.connected", true);
};
