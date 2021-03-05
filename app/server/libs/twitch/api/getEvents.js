const { events } = require("../../../../stores");
const api = require("./getUserInfoVars");

const eventsWithUserVars = [
  "onCommand",
  "onBits",
  "onRedemption",
  "onAction",
  "onBitsBadgeUpgrade",
  "onCommunityPayForward",
  "onCommunitySub",
  "onGiftPaidUpgrade",
  "onMessage",
  "onPrimeCommunityGift",
  "onPrimePaidUpgrade",
  "onRaid",
  "onResub",
  "onRewardGift",
  "onRitual",
  "onStandardPayForward",
  "onSub",
  "onSubExtend",
  "onSubGift",
];

module.exports = function getEvents() {
  const userVars = api.getDefaultVars();
  return events.get("events").map((event) => {
    if (eventsWithUserVars.includes(event.name)) {
      event.tags = {
        ...userVars,
        ...event.tags,
      };
    }
    return event;
  });
};
