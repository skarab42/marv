export default function isValidEvent(event) {
  const eventName = event && event.eventName;

  if (!eventName) return false;

  if (eventName === "onCommand" && !event.commandName) {
    return false;
  }

  if (eventName === "onRedemption" && !event.rewardId) {
    return false;
  }

  if (eventName === "onShortcut" && !event.shortcutName) {
    return false;
  }

  return true;
}
