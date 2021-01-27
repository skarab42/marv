const { BasicPubSubClient, PubSubClient } = require("twitch-pubsub-client");
const onRedemption = require("./onRedemption");
const onBits = require("./onBits");
const twitch = require("../index");

const reconnectDelay = 5;

const rootClient = new BasicPubSubClient();
const pubSubClient = new PubSubClient(rootClient);

function reconnect() {
  console.log(`Reconnecting...`);
  pubSubClient._rootClient.reconnect();
}

module.exports = async function init() {
  const userId = await pubSubClient.registerUserListener(twitch.api);

  await pubSubClient.onRedemption(userId, onRedemption);
  await pubSubClient.onBits(userId, onBits);

  pubSubClient._rootClient.onDisconnect((manually, reason) => {
    // if (manually) return;
    console.log("PUBSUB ERROR >>>", reason);
    console.log(`Reconnecting in ${reconnectDelay} sec.`);
    setTimeout(reconnect, reconnectDelay * 1000);
  });

  setTimeout(() => pubSubClient._rootClient.disconnect(), 5000);
};
